import React, { useState } from "react";
import {
  useSignS3UserAvatarMutation,
  useUpdateUserAvatarMutation,
  useMeQuery,
} from "../../generated/graphql";

interface UserAvatarUploadProps {}

const UserAvatarUpload: React.FC<UserAvatarUploadProps> = () => {
  const [fileState, setFileState] = useState<FileList | null>(null);
  const { data } = useMeQuery();
  const [signS3UserAvatarMutation] = useSignS3UserAvatarMutation();
  const [updateUserAvatarMutation] = useUpdateUserAvatarMutation();

  const handleUploadSubmit = async (e: any) => {
    e.preventDefault();
    if (fileState?.length) {
      const { type } = fileState[0];
      const response = await signS3UserAvatarMutation({
        variables: { filename: `${data?.me?.id}.jpg`, filetype: type },
      });

      if (
        response.data?.signS3UserAvatar.signedS3url &&
        response.data?.signS3UserAvatar.obj_url
      ) {
        try {
          await fetch(response.data?.signS3UserAvatar.signedS3url, {
            method: "PUT",
            body: fileState[0],
          });
          await updateUserAvatarMutation({
            variables: {
              avatar_url: response.data?.signS3UserAvatar.obj_url.replace(
                "https",
                "https:"
              ),
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
    <form onSubmit={handleUploadSubmit}>
      <input type="file" onChange={(e) => setFileState(e.target.files)} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UserAvatarUpload;
