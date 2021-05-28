import { useRouter } from "next/dist/client/router";
import { useGetStoryByIdQuery } from "../generated/graphql";

export const useGetStoryIdFromUrl = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  return intId;
};

export const useGetStoryFromUrl = () => {
  //get post id hook
  const intId = useGetStoryIdFromUrl();
  return useGetStoryByIdQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
};
