import React, { useState } from "react";
import {
  useSignS3StoryCoverMutation,
  useUpdateStoryCoverMutation,
  useMeQuery,
} from "../../generated/graphql";

interface StoryCoverUploadProps {
  storyId: number;
}

const StoryCoverUpload: React.FC<StoryCoverUploadProps> = ({ storyId }) => {
  const [fileState, setFileState] = useState<FileList | null>(null);
  const { data } = useMeQuery();
  const [signS3StoryCoverMutation] = useSignS3StoryCoverMutation();
  const [updateStoryCoverMutation] = useUpdateStoryCoverMutation();

  const handleUploadSubmit = async (e: any) => {
    e.preventDefault();
    if (data?.me?.id && fileState?.length) {
      const suffix = Date.now();
      const { type } = fileState[0];
      // sign with s3
      const response = await signS3StoryCoverMutation({
        variables: { filename: `${storyId}-${suffix}.jpg`, filetype: type },
      });

      if (
        response.data?.signS3StoryCover.signedS3url &&
        response.data?.signS3StoryCover.obj_url
      ) {
        try {
          // upload to s3
          await fetch(response.data?.signS3StoryCover.signedS3url, {
            method: "PUT",
            body: fileState[0],
          });
          // update image url in db
          await updateStoryCoverMutation({
            variables: {
              cover_url: response.data?.signS3StoryCover.obj_url.replace(
                "https",
                "https:"
              ),
              id: storyId,
            },
          });
          setFileState(null);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <form
      onSubmit={handleUploadSubmit}
      className="mx-4 h-full bg-opacity-50 text-white bg-gray-700 flex flex-col items-center justify-center"
    >
      <div className="text-center">
        <label htmlFor="upload" className="cursor-pointer">
          Click to Select a New picture
          <input
            className="hidden"
            id="upload"
            type="file"
            accept="image/*"
            onChange={(e) => setFileState(e.target.files)}
          />
        </label>
        {fileState?.length && <div>{fileState[0].name}</div>}
      </div>
      <div>
        <button type="submit" className="mt-4 p-2 border border-white rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default StoryCoverUpload;
