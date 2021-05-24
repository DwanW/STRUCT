import React, { useRef } from "react";
import {
  useSignS3StoryCoverMutation,
  useUpdateStoryCoverMutation,
  useMeQuery,
} from "../../generated/graphql";

interface StoryCoverUploadProps {
  storyId: number;
}

const StoryCoverUpload: React.FC<StoryCoverUploadProps> = ({ storyId }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { data } = useMeQuery();
  const [signS3StoryCoverMutation] = useSignS3StoryCoverMutation();
  const [updateStoryCoverMutation] = useUpdateStoryCoverMutation();

  const handleUploadSubmit = async (e: any) => {
    e.preventDefault();
    if (data?.me?.id && fileRef?.current?.files) {
      const suffix = Date.now();
      const { type } = fileRef.current.files[0];
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
            body: fileRef.current.files[0],
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
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <form onSubmit={handleUploadSubmit}>
      <input type="file" ref={fileRef} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default StoryCoverUpload;
