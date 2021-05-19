import React, { useRef } from "react";
import {
  useSignS3UserAvatarMutation,
  useUpdateUserAvatarMutation,
  useMeQuery,
} from "../../generated/graphql";

interface UserAvatarUploadProps {}

const UserAvatarUpload: React.FC<UserAvatarUploadProps> = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { data } = useMeQuery();
  const [signS3UserAvatarMutation] = useSignS3UserAvatarMutation();
  const [updateUserAvatarMutation] = useUpdateUserAvatarMutation();

  const handleUploadSubmit = async (e: any) => {
    e.preventDefault();
    if (fileRef?.current?.files) {
      const { type } = fileRef.current.files[0];
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
            body: fileRef.current.files[0],
          });
          await updateUserAvatarMutation({
            variables: {
              avatar_url: response.data?.signS3UserAvatar.obj_url.replace(
                "https",
                "https:"
              ),
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

export default UserAvatarUpload;
