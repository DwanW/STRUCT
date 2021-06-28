import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apollo = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getNewStories: {
            keyArgs: false,
            merge(existing = { stories: [] }, incoming) {
              return {
                stories: [...existing.stories, ...incoming.stories],
                next_cursor: incoming.next_cursor,
              };
            },
          },
          getTopStories: {
            keyArgs: false,
            merge(existing = { stories: [] }, incoming) {
              return {
                stories: [...existing.stories, ...incoming.stories],
                next_cursor: incoming.next_cursor,
              };
            },
          },
          getHelpfulStoryReviews: {
            keyArgs: ["storyId"],
            merge(existing = { reviews: [] }, incoming) {
              return {
                reviews: [...existing.reviews, ...incoming.reviews],
                next_cursor: incoming.next_cursor,
              };
            },
          },
        },
      },
    },
  }),
  credentials: "include",
});
