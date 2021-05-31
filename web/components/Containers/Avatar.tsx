import { Maybe } from "graphql/jsutils/Maybe";
import React from "react";

interface AvatarProps {
  avatarUrl: Maybe<string> | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ avatarUrl }) => {
  return (
    <img
      alt="avatar"
      className="w-12 h-12 rounded-full align-middle border-none shadow-lg"
      src={avatarUrl ? avatarUrl : "/img/user-default.svg"}
    />
  );
};

export default Avatar;
