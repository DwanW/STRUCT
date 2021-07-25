import { useRouter } from "next/dist/client/router";
import {
  useGetStoryByIdQuery,
  useGetUserByIdQuery,
} from "../generated/graphql";

export const useGetIdFromUrl = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  return intId;
};

export const useGetStoryFromUrl = () => {
  //get post id hook
  const intId = useGetIdFromUrl();
  return useGetStoryByIdQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
};

export const useGetUserFromUrl = () => {
  //get user info hook
  const intId = useGetIdFromUrl();
  return useGetUserByIdQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
};

export const useGetSearchInputFromUrl = () => {
  const router = useRouter();
  const searchValue = router.query.param as string | undefined;
  const searchTag = router.query.tag as string | undefined;
  return [searchValue, searchTag];
};
