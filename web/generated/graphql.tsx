import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type CreateStoryInput = {
  title: Scalars['String'];
  overview: Scalars['String'];
};

export type CreateSubStoryInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type HelpfulReviewCursor = {
  id: Scalars['Int'];
  helpful_score: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: AuthResponse;
  login: AuthResponse;
  changePassword: AuthResponse;
  forgotPassword: Scalars['Boolean'];
  updateUserAbout?: Maybe<User>;
  logout: Scalars['Boolean'];
  deleteAccount: Scalars['Boolean'];
  signS3UserAvatar: S3SignResponse;
  updateUserAvatar?: Maybe<User>;
  createStory: Story;
  updateStory: Story;
  publishStory: Story;
  vote: Scalars['Boolean'];
  signS3StoryCover: S3SignResponse;
  deleteStoryById: Scalars['Boolean'];
  updateStoryCover?: Maybe<Story>;
  createSubStory: SubStoryResponse;
  updateSubStory: SubStoryResponse;
  rearrangeSubStory: Scalars['Boolean'];
  deleteSubStoryById: Scalars['Boolean'];
  createReview: ReviewResponse;
  updateReview: Review;
  voteReview: Review;
  deleteReview: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationUpdateUserAboutArgs = {
  about: Scalars['String'];
};


export type MutationSignS3UserAvatarArgs = {
  filetype: Scalars['String'];
  filename: Scalars['String'];
};


export type MutationUpdateUserAvatarArgs = {
  id: Scalars['Int'];
  avatar_url: Scalars['String'];
};


export type MutationCreateStoryArgs = {
  storyInput: CreateStoryInput;
};


export type MutationUpdateStoryArgs = {
  tags: Scalars['String'];
  overview: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationPublishStoryArgs = {
  id: Scalars['Int'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  storyId: Scalars['Int'];
};


export type MutationSignS3StoryCoverArgs = {
  filetype: Scalars['String'];
  filename: Scalars['String'];
};


export type MutationDeleteStoryByIdArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateStoryCoverArgs = {
  id: Scalars['Int'];
  cover_url: Scalars['String'];
};


export type MutationCreateSubStoryArgs = {
  storyId: Scalars['Int'];
  storyInput: CreateSubStoryInput;
};


export type MutationUpdateSubStoryArgs = {
  text: Scalars['String'];
  title: Scalars['String'];
  storyId: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationRearrangeSubStoryArgs = {
  next_order_index?: Maybe<Scalars['Float']>;
  prev_order_index?: Maybe<Scalars['Float']>;
  storyId: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationDeleteSubStoryByIdArgs = {
  storyId: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationCreateReviewArgs = {
  type: Scalars['String'];
  text: Scalars['String'];
  storyId: Scalars['Int'];
};


export type MutationUpdateReviewArgs = {
  text: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationVoteReviewArgs = {
  value: Scalars['Int'];
  reviewId: Scalars['Int'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['Int'];
};

export type PaginatedReview = {
  __typename?: 'PaginatedReview';
  reviews: Array<Review>;
  next_cursor?: Maybe<Review>;
};

export type PaginatedStory = {
  __typename?: 'PaginatedStory';
  stories: Array<Story>;
  next_cursor?: Maybe<Story>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getUserById?: Maybe<User>;
  getStoryById?: Maybe<Story>;
  searchStory?: Maybe<PaginatedStory>;
  getMyStories?: Maybe<PaginatedStory>;
  getNewStories: PaginatedStory;
  getTopStories: PaginatedStory;
  getSubStoryById?: Maybe<SubStory>;
  getSubStoriesFromStoryId: Array<SubStory>;
  getReviewById?: Maybe<Review>;
  canUserCreateReview: Scalars['Boolean'];
  getHelpfulStoryReviews: PaginatedReview;
  getRecentUserReviews: PaginatedReview;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetStoryByIdArgs = {
  id: Scalars['Int'];
};


export type QuerySearchStoryArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
  tags?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};


export type QueryGetMyStoriesArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryGetNewStoriesArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryGetTopStoriesArgs = {
  time_range?: Maybe<Scalars['Int']>;
  cursor?: Maybe<TopStoryCursor>;
  limit: Scalars['Int'];
};


export type QueryGetSubStoryByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetSubStoriesFromStoryIdArgs = {
  storyId: Scalars['Int'];
};


export type QueryGetReviewByIdArgs = {
  id: Scalars['Int'];
};


export type QueryCanUserCreateReviewArgs = {
  storyCreatorId: Scalars['Int'];
  storyId: Scalars['Int'];
};


export type QueryGetHelpfulStoryReviewsArgs = {
  storyId: Scalars['Int'];
  time_range?: Maybe<Scalars['Int']>;
  cursor?: Maybe<HelpfulReviewCursor>;
  limit: Scalars['Int'];
};


export type QueryGetRecentUserReviewsArgs = {
  userId: Scalars['Int'];
  time_range?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['Float']>;
  limit: Scalars['Int'];
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

/** review model */
export type Review = {
  __typename?: 'Review';
  id: Scalars['Float'];
  text: Scalars['String'];
  type: Scalars['String'];
  helpful_score: Scalars['Float'];
  funny_score: Scalars['Float'];
  unhelpful_score: Scalars['Float'];
  userId: Scalars['Float'];
  storyId: Scalars['Float'];
  reviewVoteStatus?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  story: Story;
};

export type ReviewResponse = {
  __typename?: 'ReviewResponse';
  review?: Maybe<Review>;
  error?: Maybe<Scalars['String']>;
};

export type S3SignResponse = {
  __typename?: 'S3SignResponse';
  error?: Maybe<Scalars['String']>;
  signedS3url?: Maybe<Scalars['String']>;
  obj_url?: Maybe<Scalars['String']>;
};

/** story model */
export type Story = {
  __typename?: 'Story';
  id: Scalars['Float'];
  title: Scalars['String'];
  overview: Scalars['String'];
  cover_url?: Maybe<Scalars['String']>;
  up_vote: Scalars['Float'];
  down_vote: Scalars['Float'];
  status: Scalars['String'];
  tags: Scalars['String'];
  creatorId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  creator: User;
};

/** sub-story model */
export type SubStory = {
  __typename?: 'SubStory';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  order_index: Scalars['Float'];
  storyId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  story: Story;
};

export type SubStoryResponse = {
  __typename?: 'SubStoryResponse';
  error?: Maybe<Scalars['String']>;
  substory?: Maybe<SubStory>;
};

export type TopStoryCursor = {
  id: Scalars['Int'];
  net_up_votes: Scalars['Int'];
};

/** The user model */
export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  about: Scalars['String'];
  endorsed: Scalars['Float'];
  avatar_url?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'error'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email'>
    )> }
  ) }
);

export type CreateReviewMutationVariables = Exact<{
  type: Scalars['String'];
  text: Scalars['String'];
  storyId: Scalars['Int'];
}>;


export type CreateReviewMutation = (
  { __typename?: 'Mutation' }
  & { createReview: (
    { __typename?: 'ReviewResponse' }
    & Pick<ReviewResponse, 'error'>
    & { review?: Maybe<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'text' | 'type' | 'helpful_score' | 'funny_score' | 'unhelpful_score' | 'userId' | 'storyId' | 'createdAt' | 'reviewVoteStatus'>
    )> }
  ) }
);

export type CreateStoryMutationVariables = Exact<{
  storyInput: CreateStoryInput;
}>;


export type CreateStoryMutation = (
  { __typename?: 'Mutation' }
  & { createStory: (
    { __typename?: 'Story' }
    & Pick<Story, 'id' | 'title' | 'overview' | 'cover_url' | 'up_vote' | 'down_vote' | 'status' | 'tags' | 'creatorId' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type CreateSubStoryMutationVariables = Exact<{
  storyId: Scalars['Int'];
  storyInput: CreateSubStoryInput;
}>;


export type CreateSubStoryMutation = (
  { __typename?: 'Mutation' }
  & { createSubStory: (
    { __typename?: 'SubStoryResponse' }
    & Pick<SubStoryResponse, 'error'>
    & { substory?: Maybe<(
      { __typename?: 'SubStory' }
      & Pick<SubStory, 'id' | 'title' | 'text' | 'order_index' | 'storyId' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAccount'>
);

export type DeleteReviewByIdMutationVariables = Exact<{
  reviewId: Scalars['Int'];
}>;


export type DeleteReviewByIdMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteReview'>
);

export type DeleteSubStoryByIdMutationVariables = Exact<{
  id: Scalars['Int'];
  storyId: Scalars['Int'];
}>;


export type DeleteSubStoryByIdMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSubStoryById'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'error'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'createdAt'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'error'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'updatedAt' | 'username' | 'createdAt' | 'email'>
    )> }
  ) }
);

export type SignS3StoryCoverMutationVariables = Exact<{
  filename: Scalars['String'];
  filetype: Scalars['String'];
}>;


export type SignS3StoryCoverMutation = (
  { __typename?: 'Mutation' }
  & { signS3StoryCover: (
    { __typename?: 'S3SignResponse' }
    & Pick<S3SignResponse, 'error' | 'signedS3url' | 'obj_url'>
  ) }
);

export type SignS3UserAvatarMutationVariables = Exact<{
  filename: Scalars['String'];
  filetype: Scalars['String'];
}>;


export type SignS3UserAvatarMutation = (
  { __typename?: 'Mutation' }
  & { signS3UserAvatar: (
    { __typename?: 'S3SignResponse' }
    & Pick<S3SignResponse, 'error' | 'signedS3url' | 'obj_url'>
  ) }
);

export type UpdateStoryMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  overview: Scalars['String'];
  tags: Scalars['String'];
}>;


export type UpdateStoryMutation = (
  { __typename?: 'Mutation' }
  & { updateStory: (
    { __typename?: 'Story' }
    & Pick<Story, 'id' | 'title' | 'overview' | 'tags' | 'updatedAt' | 'createdAt'>
  ) }
);

export type UpdateStoryCoverMutationVariables = Exact<{
  cover_url: Scalars['String'];
  id: Scalars['Int'];
}>;


export type UpdateStoryCoverMutation = (
  { __typename?: 'Mutation' }
  & { updateStoryCover?: Maybe<(
    { __typename?: 'Story' }
    & Pick<Story, 'id' | 'cover_url'>
  )> }
);

export type UpdateSubStoryMutationVariables = Exact<{
  id: Scalars['Int'];
  storyId: Scalars['Int'];
  title: Scalars['String'];
  text: Scalars['String'];
}>;


export type UpdateSubStoryMutation = (
  { __typename?: 'Mutation' }
  & { updateSubStory: (
    { __typename?: 'SubStoryResponse' }
    & Pick<SubStoryResponse, 'error'>
    & { substory?: Maybe<(
      { __typename?: 'SubStory' }
      & Pick<SubStory, 'id' | 'title' | 'text' | 'order_index'>
    )> }
  ) }
);

export type UpdateUserAboutMutationVariables = Exact<{
  about: Scalars['String'];
}>;


export type UpdateUserAboutMutation = (
  { __typename?: 'Mutation' }
  & { updateUserAbout?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'avatar_url' | 'about' | 'createdAt' | 'endorsed'>
  )> }
);

export type UpdateUserAvatarMutationVariables = Exact<{
  avatar_url: Scalars['String'];
  id: Scalars['Int'];
}>;


export type UpdateUserAvatarMutation = (
  { __typename?: 'Mutation' }
  & { updateUserAvatar?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'avatar_url'>
  )> }
);

export type VoteReviewMutationVariables = Exact<{
  value: Scalars['Int'];
  reviewId: Scalars['Int'];
}>;


export type VoteReviewMutation = (
  { __typename?: 'Mutation' }
  & { voteReview: (
    { __typename?: 'Review' }
    & Pick<Review, 'id' | 'helpful_score' | 'funny_score' | 'unhelpful_score' | 'reviewVoteStatus'>
  ) }
);

export type CanUserCreateReviewQueryVariables = Exact<{
  storyId: Scalars['Int'];
  storyCreatorId: Scalars['Int'];
}>;


export type CanUserCreateReviewQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'canUserCreateReview'>
);

export type GetHelpfulStoryReviewsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<HelpfulReviewCursor>;
  time_range?: Maybe<Scalars['Int']>;
  storyId: Scalars['Int'];
}>;


export type GetHelpfulStoryReviewsQuery = (
  { __typename?: 'Query' }
  & { getHelpfulStoryReviews: (
    { __typename?: 'PaginatedReview' }
    & { reviews: Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'text' | 'type' | 'helpful_score' | 'funny_score' | 'unhelpful_score' | 'userId' | 'storyId' | 'createdAt' | 'reviewVoteStatus'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'avatar_url'>
      ) }
    )>, next_cursor?: Maybe<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'helpful_score'>
    )> }
  ) }
);

export type GetMyStoriesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['Int']>;
}>;


export type GetMyStoriesQuery = (
  { __typename?: 'Query' }
  & { getMyStories?: Maybe<(
    { __typename?: 'PaginatedStory' }
    & { stories: Array<(
      { __typename?: 'Story' }
      & Pick<Story, 'id' | 'title' | 'overview' | 'createdAt' | 'cover_url' | 'up_vote' | 'down_vote' | 'tags'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>, next_cursor?: Maybe<(
      { __typename?: 'Story' }
      & Pick<Story, 'id'>
    )> }
  )> }
);

export type GetRecentUserReviewsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['Float']>;
  time_range?: Maybe<Scalars['String']>;
  userId: Scalars['Int'];
}>;


export type GetRecentUserReviewsQuery = (
  { __typename?: 'Query' }
  & { getRecentUserReviews: (
    { __typename?: 'PaginatedReview' }
    & { reviews: Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'text' | 'type' | 'helpful_score' | 'funny_score' | 'userId' | 'storyId' | 'reviewVoteStatus' | 'createdAt' | 'updatedAt'>
    )>, next_cursor?: Maybe<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'text' | 'type' | 'helpful_score' | 'funny_score' | 'userId' | 'storyId' | 'reviewVoteStatus' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type GetStoryByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetStoryByIdQuery = (
  { __typename?: 'Query' }
  & { getStoryById?: Maybe<(
    { __typename?: 'Story' }
    & Pick<Story, 'id' | 'title' | 'overview' | 'up_vote' | 'down_vote' | 'cover_url' | 'status' | 'tags' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar_url' | 'endorsed' | 'about'>
    ) }
  )> }
);

export type GetSubStoriesFromStoryIdQueryVariables = Exact<{
  storyId: Scalars['Int'];
}>;


export type GetSubStoriesFromStoryIdQuery = (
  { __typename?: 'Query' }
  & { getSubStoriesFromStoryId: Array<(
    { __typename?: 'SubStory' }
    & Pick<SubStory, 'id' | 'title' | 'text' | 'order_index' | 'storyId' | 'createdAt' | 'updatedAt'>
  )> }
);

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserByIdQuery = (
  { __typename?: 'Query' }
  & { getUserById?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatar_url' | 'endorsed' | 'about' | 'createdAt'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'avatar_url' | 'about' | 'createdAt' | 'endorsed'>
  )> }
);

export type SearchStoryQueryVariables = Exact<{
  title: Scalars['String'];
  tags?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['Int']>;
}>;


export type SearchStoryQuery = (
  { __typename?: 'Query' }
  & { searchStory?: Maybe<(
    { __typename?: 'PaginatedStory' }
    & { stories: Array<(
      { __typename?: 'Story' }
      & Pick<Story, 'id' | 'title' | 'overview' | 'cover_url' | 'up_vote' | 'down_vote' | 'tags'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>, next_cursor?: Maybe<(
      { __typename?: 'Story' }
      & Pick<Story, 'id'>
    )> }
  )> }
);

export type StoriesNewQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['Int']>;
}>;


export type StoriesNewQuery = (
  { __typename?: 'Query' }
  & { getNewStories: (
    { __typename?: 'PaginatedStory' }
    & { stories: Array<(
      { __typename?: 'Story' }
      & Pick<Story, 'id' | 'title' | 'overview' | 'cover_url' | 'createdAt' | 'up_vote' | 'down_vote' | 'tags'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>, next_cursor?: Maybe<(
      { __typename?: 'Story' }
      & Pick<Story, 'id'>
    )> }
  ) }
);

export type StoriesTopQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<TopStoryCursor>;
  time_range?: Maybe<Scalars['Int']>;
}>;


export type StoriesTopQuery = (
  { __typename?: 'Query' }
  & { getTopStories: (
    { __typename?: 'PaginatedStory' }
    & { stories: Array<(
      { __typename?: 'Story' }
      & Pick<Story, 'id' | 'title' | 'overview' | 'createdAt' | 'cover_url' | 'up_vote' | 'down_vote' | 'tags'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>, next_cursor?: Maybe<(
      { __typename?: 'Story' }
      & Pick<Story, 'id' | 'up_vote' | 'down_vote'>
    )> }
  ) }
);


export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    error
    user {
      username
      email
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateReviewDocument = gql`
    mutation createReview($type: String!, $text: String!, $storyId: Int!) {
  createReview(type: $type, text: $text, storyId: $storyId) {
    error
    review {
      id
      text
      type
      helpful_score
      funny_score
      unhelpful_score
      userId
      storyId
      createdAt
      reviewVoteStatus
    }
  }
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      type: // value for 'type'
 *      text: // value for 'text'
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const CreateStoryDocument = gql`
    mutation CreateStory($storyInput: CreateStoryInput!) {
  createStory(storyInput: $storyInput) {
    id
    title
    overview
    cover_url
    up_vote
    down_vote
    status
    tags
    creator {
      id
      username
    }
    creatorId
    createdAt
  }
}
    `;
export type CreateStoryMutationFn = Apollo.MutationFunction<CreateStoryMutation, CreateStoryMutationVariables>;

/**
 * __useCreateStoryMutation__
 *
 * To run a mutation, you first call `useCreateStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStoryMutation, { data, loading, error }] = useCreateStoryMutation({
 *   variables: {
 *      storyInput: // value for 'storyInput'
 *   },
 * });
 */
export function useCreateStoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateStoryMutation, CreateStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStoryMutation, CreateStoryMutationVariables>(CreateStoryDocument, options);
      }
export type CreateStoryMutationHookResult = ReturnType<typeof useCreateStoryMutation>;
export type CreateStoryMutationResult = Apollo.MutationResult<CreateStoryMutation>;
export type CreateStoryMutationOptions = Apollo.BaseMutationOptions<CreateStoryMutation, CreateStoryMutationVariables>;
export const CreateSubStoryDocument = gql`
    mutation CreateSubStory($storyId: Int!, $storyInput: CreateSubStoryInput!) {
  createSubStory(storyId: $storyId, storyInput: $storyInput) {
    error
    substory {
      id
      title
      text
      order_index
      storyId
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateSubStoryMutationFn = Apollo.MutationFunction<CreateSubStoryMutation, CreateSubStoryMutationVariables>;

/**
 * __useCreateSubStoryMutation__
 *
 * To run a mutation, you first call `useCreateSubStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubStoryMutation, { data, loading, error }] = useCreateSubStoryMutation({
 *   variables: {
 *      storyId: // value for 'storyId'
 *      storyInput: // value for 'storyInput'
 *   },
 * });
 */
export function useCreateSubStoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubStoryMutation, CreateSubStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubStoryMutation, CreateSubStoryMutationVariables>(CreateSubStoryDocument, options);
      }
export type CreateSubStoryMutationHookResult = ReturnType<typeof useCreateSubStoryMutation>;
export type CreateSubStoryMutationResult = Apollo.MutationResult<CreateSubStoryMutation>;
export type CreateSubStoryMutationOptions = Apollo.BaseMutationOptions<CreateSubStoryMutation, CreateSubStoryMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount {
  deleteAccount
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const DeleteReviewByIdDocument = gql`
    mutation DeleteReviewById($reviewId: Int!) {
  deleteReview(id: $reviewId)
}
    `;
export type DeleteReviewByIdMutationFn = Apollo.MutationFunction<DeleteReviewByIdMutation, DeleteReviewByIdMutationVariables>;

/**
 * __useDeleteReviewByIdMutation__
 *
 * To run a mutation, you first call `useDeleteReviewByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReviewByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReviewByIdMutation, { data, loading, error }] = useDeleteReviewByIdMutation({
 *   variables: {
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useDeleteReviewByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReviewByIdMutation, DeleteReviewByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReviewByIdMutation, DeleteReviewByIdMutationVariables>(DeleteReviewByIdDocument, options);
      }
export type DeleteReviewByIdMutationHookResult = ReturnType<typeof useDeleteReviewByIdMutation>;
export type DeleteReviewByIdMutationResult = Apollo.MutationResult<DeleteReviewByIdMutation>;
export type DeleteReviewByIdMutationOptions = Apollo.BaseMutationOptions<DeleteReviewByIdMutation, DeleteReviewByIdMutationVariables>;
export const DeleteSubStoryByIdDocument = gql`
    mutation DeleteSubStoryById($id: Int!, $storyId: Int!) {
  deleteSubStoryById(id: $id, storyId: $storyId)
}
    `;
export type DeleteSubStoryByIdMutationFn = Apollo.MutationFunction<DeleteSubStoryByIdMutation, DeleteSubStoryByIdMutationVariables>;

/**
 * __useDeleteSubStoryByIdMutation__
 *
 * To run a mutation, you first call `useDeleteSubStoryByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubStoryByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubStoryByIdMutation, { data, loading, error }] = useDeleteSubStoryByIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useDeleteSubStoryByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubStoryByIdMutation, DeleteSubStoryByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubStoryByIdMutation, DeleteSubStoryByIdMutationVariables>(DeleteSubStoryByIdDocument, options);
      }
export type DeleteSubStoryByIdMutationHookResult = ReturnType<typeof useDeleteSubStoryByIdMutation>;
export type DeleteSubStoryByIdMutationResult = Apollo.MutationResult<DeleteSubStoryByIdMutation>;
export type DeleteSubStoryByIdMutationOptions = Apollo.BaseMutationOptions<DeleteSubStoryByIdMutation, DeleteSubStoryByIdMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    error
    user {
      id
      username
      createdAt
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    error
    user {
      updatedAt
      username
      createdAt
      email
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SignS3StoryCoverDocument = gql`
    mutation SignS3StoryCover($filename: String!, $filetype: String!) {
  signS3StoryCover(filename: $filename, filetype: $filetype) {
    error
    signedS3url
    obj_url
  }
}
    `;
export type SignS3StoryCoverMutationFn = Apollo.MutationFunction<SignS3StoryCoverMutation, SignS3StoryCoverMutationVariables>;

/**
 * __useSignS3StoryCoverMutation__
 *
 * To run a mutation, you first call `useSignS3StoryCoverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignS3StoryCoverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signS3StoryCoverMutation, { data, loading, error }] = useSignS3StoryCoverMutation({
 *   variables: {
 *      filename: // value for 'filename'
 *      filetype: // value for 'filetype'
 *   },
 * });
 */
export function useSignS3StoryCoverMutation(baseOptions?: Apollo.MutationHookOptions<SignS3StoryCoverMutation, SignS3StoryCoverMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignS3StoryCoverMutation, SignS3StoryCoverMutationVariables>(SignS3StoryCoverDocument, options);
      }
export type SignS3StoryCoverMutationHookResult = ReturnType<typeof useSignS3StoryCoverMutation>;
export type SignS3StoryCoverMutationResult = Apollo.MutationResult<SignS3StoryCoverMutation>;
export type SignS3StoryCoverMutationOptions = Apollo.BaseMutationOptions<SignS3StoryCoverMutation, SignS3StoryCoverMutationVariables>;
export const SignS3UserAvatarDocument = gql`
    mutation SignS3UserAvatar($filename: String!, $filetype: String!) {
  signS3UserAvatar(filename: $filename, filetype: $filetype) {
    error
    signedS3url
    obj_url
  }
}
    `;
export type SignS3UserAvatarMutationFn = Apollo.MutationFunction<SignS3UserAvatarMutation, SignS3UserAvatarMutationVariables>;

/**
 * __useSignS3UserAvatarMutation__
 *
 * To run a mutation, you first call `useSignS3UserAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignS3UserAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signS3UserAvatarMutation, { data, loading, error }] = useSignS3UserAvatarMutation({
 *   variables: {
 *      filename: // value for 'filename'
 *      filetype: // value for 'filetype'
 *   },
 * });
 */
export function useSignS3UserAvatarMutation(baseOptions?: Apollo.MutationHookOptions<SignS3UserAvatarMutation, SignS3UserAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignS3UserAvatarMutation, SignS3UserAvatarMutationVariables>(SignS3UserAvatarDocument, options);
      }
export type SignS3UserAvatarMutationHookResult = ReturnType<typeof useSignS3UserAvatarMutation>;
export type SignS3UserAvatarMutationResult = Apollo.MutationResult<SignS3UserAvatarMutation>;
export type SignS3UserAvatarMutationOptions = Apollo.BaseMutationOptions<SignS3UserAvatarMutation, SignS3UserAvatarMutationVariables>;
export const UpdateStoryDocument = gql`
    mutation UpdateStory($id: Int!, $title: String!, $overview: String!, $tags: String!) {
  updateStory(id: $id, title: $title, overview: $overview, tags: $tags) {
    id
    title
    overview
    tags
    updatedAt
    createdAt
  }
}
    `;
export type UpdateStoryMutationFn = Apollo.MutationFunction<UpdateStoryMutation, UpdateStoryMutationVariables>;

/**
 * __useUpdateStoryMutation__
 *
 * To run a mutation, you first call `useUpdateStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStoryMutation, { data, loading, error }] = useUpdateStoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      overview: // value for 'overview'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useUpdateStoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStoryMutation, UpdateStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStoryMutation, UpdateStoryMutationVariables>(UpdateStoryDocument, options);
      }
export type UpdateStoryMutationHookResult = ReturnType<typeof useUpdateStoryMutation>;
export type UpdateStoryMutationResult = Apollo.MutationResult<UpdateStoryMutation>;
export type UpdateStoryMutationOptions = Apollo.BaseMutationOptions<UpdateStoryMutation, UpdateStoryMutationVariables>;
export const UpdateStoryCoverDocument = gql`
    mutation UpdateStoryCover($cover_url: String!, $id: Int!) {
  updateStoryCover(cover_url: $cover_url, id: $id) {
    id
    cover_url
  }
}
    `;
export type UpdateStoryCoverMutationFn = Apollo.MutationFunction<UpdateStoryCoverMutation, UpdateStoryCoverMutationVariables>;

/**
 * __useUpdateStoryCoverMutation__
 *
 * To run a mutation, you first call `useUpdateStoryCoverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStoryCoverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStoryCoverMutation, { data, loading, error }] = useUpdateStoryCoverMutation({
 *   variables: {
 *      cover_url: // value for 'cover_url'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateStoryCoverMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStoryCoverMutation, UpdateStoryCoverMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStoryCoverMutation, UpdateStoryCoverMutationVariables>(UpdateStoryCoverDocument, options);
      }
export type UpdateStoryCoverMutationHookResult = ReturnType<typeof useUpdateStoryCoverMutation>;
export type UpdateStoryCoverMutationResult = Apollo.MutationResult<UpdateStoryCoverMutation>;
export type UpdateStoryCoverMutationOptions = Apollo.BaseMutationOptions<UpdateStoryCoverMutation, UpdateStoryCoverMutationVariables>;
export const UpdateSubStoryDocument = gql`
    mutation UpdateSubStory($id: Int!, $storyId: Int!, $title: String!, $text: String!) {
  updateSubStory(id: $id, storyId: $storyId, title: $title, text: $text) {
    error
    substory {
      id
      title
      text
      order_index
    }
  }
}
    `;
export type UpdateSubStoryMutationFn = Apollo.MutationFunction<UpdateSubStoryMutation, UpdateSubStoryMutationVariables>;

/**
 * __useUpdateSubStoryMutation__
 *
 * To run a mutation, you first call `useUpdateSubStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubStoryMutation, { data, loading, error }] = useUpdateSubStoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      storyId: // value for 'storyId'
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdateSubStoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSubStoryMutation, UpdateSubStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSubStoryMutation, UpdateSubStoryMutationVariables>(UpdateSubStoryDocument, options);
      }
export type UpdateSubStoryMutationHookResult = ReturnType<typeof useUpdateSubStoryMutation>;
export type UpdateSubStoryMutationResult = Apollo.MutationResult<UpdateSubStoryMutation>;
export type UpdateSubStoryMutationOptions = Apollo.BaseMutationOptions<UpdateSubStoryMutation, UpdateSubStoryMutationVariables>;
export const UpdateUserAboutDocument = gql`
    mutation UpdateUserAbout($about: String!) {
  updateUserAbout(about: $about) {
    id
    username
    email
    avatar_url
    about
    createdAt
    endorsed
  }
}
    `;
export type UpdateUserAboutMutationFn = Apollo.MutationFunction<UpdateUserAboutMutation, UpdateUserAboutMutationVariables>;

/**
 * __useUpdateUserAboutMutation__
 *
 * To run a mutation, you first call `useUpdateUserAboutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAboutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAboutMutation, { data, loading, error }] = useUpdateUserAboutMutation({
 *   variables: {
 *      about: // value for 'about'
 *   },
 * });
 */
export function useUpdateUserAboutMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserAboutMutation, UpdateUserAboutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserAboutMutation, UpdateUserAboutMutationVariables>(UpdateUserAboutDocument, options);
      }
export type UpdateUserAboutMutationHookResult = ReturnType<typeof useUpdateUserAboutMutation>;
export type UpdateUserAboutMutationResult = Apollo.MutationResult<UpdateUserAboutMutation>;
export type UpdateUserAboutMutationOptions = Apollo.BaseMutationOptions<UpdateUserAboutMutation, UpdateUserAboutMutationVariables>;
export const UpdateUserAvatarDocument = gql`
    mutation UpdateUserAvatar($avatar_url: String!, $id: Int!) {
  updateUserAvatar(avatar_url: $avatar_url, id: $id) {
    id
    avatar_url
  }
}
    `;
export type UpdateUserAvatarMutationFn = Apollo.MutationFunction<UpdateUserAvatarMutation, UpdateUserAvatarMutationVariables>;

/**
 * __useUpdateUserAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateUserAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAvatarMutation, { data, loading, error }] = useUpdateUserAvatarMutation({
 *   variables: {
 *      avatar_url: // value for 'avatar_url'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateUserAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserAvatarMutation, UpdateUserAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserAvatarMutation, UpdateUserAvatarMutationVariables>(UpdateUserAvatarDocument, options);
      }
export type UpdateUserAvatarMutationHookResult = ReturnType<typeof useUpdateUserAvatarMutation>;
export type UpdateUserAvatarMutationResult = Apollo.MutationResult<UpdateUserAvatarMutation>;
export type UpdateUserAvatarMutationOptions = Apollo.BaseMutationOptions<UpdateUserAvatarMutation, UpdateUserAvatarMutationVariables>;
export const VoteReviewDocument = gql`
    mutation VoteReview($value: Int!, $reviewId: Int!) {
  voteReview(value: $value, reviewId: $reviewId) {
    id
    helpful_score
    funny_score
    unhelpful_score
    reviewVoteStatus
  }
}
    `;
export type VoteReviewMutationFn = Apollo.MutationFunction<VoteReviewMutation, VoteReviewMutationVariables>;

/**
 * __useVoteReviewMutation__
 *
 * To run a mutation, you first call `useVoteReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteReviewMutation, { data, loading, error }] = useVoteReviewMutation({
 *   variables: {
 *      value: // value for 'value'
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useVoteReviewMutation(baseOptions?: Apollo.MutationHookOptions<VoteReviewMutation, VoteReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteReviewMutation, VoteReviewMutationVariables>(VoteReviewDocument, options);
      }
export type VoteReviewMutationHookResult = ReturnType<typeof useVoteReviewMutation>;
export type VoteReviewMutationResult = Apollo.MutationResult<VoteReviewMutation>;
export type VoteReviewMutationOptions = Apollo.BaseMutationOptions<VoteReviewMutation, VoteReviewMutationVariables>;
export const CanUserCreateReviewDocument = gql`
    query CanUserCreateReview($storyId: Int!, $storyCreatorId: Int!) {
  canUserCreateReview(storyId: $storyId, storyCreatorId: $storyCreatorId)
}
    `;

/**
 * __useCanUserCreateReviewQuery__
 *
 * To run a query within a React component, call `useCanUserCreateReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useCanUserCreateReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCanUserCreateReviewQuery({
 *   variables: {
 *      storyId: // value for 'storyId'
 *      storyCreatorId: // value for 'storyCreatorId'
 *   },
 * });
 */
export function useCanUserCreateReviewQuery(baseOptions: Apollo.QueryHookOptions<CanUserCreateReviewQuery, CanUserCreateReviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CanUserCreateReviewQuery, CanUserCreateReviewQueryVariables>(CanUserCreateReviewDocument, options);
      }
export function useCanUserCreateReviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CanUserCreateReviewQuery, CanUserCreateReviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CanUserCreateReviewQuery, CanUserCreateReviewQueryVariables>(CanUserCreateReviewDocument, options);
        }
export type CanUserCreateReviewQueryHookResult = ReturnType<typeof useCanUserCreateReviewQuery>;
export type CanUserCreateReviewLazyQueryHookResult = ReturnType<typeof useCanUserCreateReviewLazyQuery>;
export type CanUserCreateReviewQueryResult = Apollo.QueryResult<CanUserCreateReviewQuery, CanUserCreateReviewQueryVariables>;
export const GetHelpfulStoryReviewsDocument = gql`
    query GetHelpfulStoryReviews($limit: Int!, $cursor: HelpfulReviewCursor, $time_range: Int, $storyId: Int!) {
  getHelpfulStoryReviews(
    limit: $limit
    cursor: $cursor
    time_range: $time_range
    storyId: $storyId
  ) {
    reviews {
      id
      text
      type
      helpful_score
      funny_score
      unhelpful_score
      userId
      storyId
      createdAt
      reviewVoteStatus
      user {
        id
        username
        avatar_url
      }
    }
    next_cursor {
      id
      helpful_score
    }
  }
}
    `;

/**
 * __useGetHelpfulStoryReviewsQuery__
 *
 * To run a query within a React component, call `useGetHelpfulStoryReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHelpfulStoryReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHelpfulStoryReviewsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      time_range: // value for 'time_range'
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useGetHelpfulStoryReviewsQuery(baseOptions: Apollo.QueryHookOptions<GetHelpfulStoryReviewsQuery, GetHelpfulStoryReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHelpfulStoryReviewsQuery, GetHelpfulStoryReviewsQueryVariables>(GetHelpfulStoryReviewsDocument, options);
      }
export function useGetHelpfulStoryReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHelpfulStoryReviewsQuery, GetHelpfulStoryReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHelpfulStoryReviewsQuery, GetHelpfulStoryReviewsQueryVariables>(GetHelpfulStoryReviewsDocument, options);
        }
export type GetHelpfulStoryReviewsQueryHookResult = ReturnType<typeof useGetHelpfulStoryReviewsQuery>;
export type GetHelpfulStoryReviewsLazyQueryHookResult = ReturnType<typeof useGetHelpfulStoryReviewsLazyQuery>;
export type GetHelpfulStoryReviewsQueryResult = Apollo.QueryResult<GetHelpfulStoryReviewsQuery, GetHelpfulStoryReviewsQueryVariables>;
export const GetMyStoriesDocument = gql`
    query GetMyStories($limit: Int!, $cursor: Int) {
  getMyStories(limit: $limit, cursor: $cursor) {
    stories {
      id
      title
      overview
      createdAt
      cover_url
      up_vote
      down_vote
      tags
      creator {
        username
      }
    }
    next_cursor {
      id
    }
  }
}
    `;

/**
 * __useGetMyStoriesQuery__
 *
 * To run a query within a React component, call `useGetMyStoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyStoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyStoriesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetMyStoriesQuery(baseOptions: Apollo.QueryHookOptions<GetMyStoriesQuery, GetMyStoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyStoriesQuery, GetMyStoriesQueryVariables>(GetMyStoriesDocument, options);
      }
export function useGetMyStoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyStoriesQuery, GetMyStoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyStoriesQuery, GetMyStoriesQueryVariables>(GetMyStoriesDocument, options);
        }
export type GetMyStoriesQueryHookResult = ReturnType<typeof useGetMyStoriesQuery>;
export type GetMyStoriesLazyQueryHookResult = ReturnType<typeof useGetMyStoriesLazyQuery>;
export type GetMyStoriesQueryResult = Apollo.QueryResult<GetMyStoriesQuery, GetMyStoriesQueryVariables>;
export const GetRecentUserReviewsDocument = gql`
    query GetRecentUserReviews($limit: Int!, $cursor: Float, $time_range: String, $userId: Int!) {
  getRecentUserReviews(
    limit: $limit
    cursor: $cursor
    time_range: $time_range
    userId: $userId
  ) {
    reviews {
      id
      text
      type
      helpful_score
      funny_score
      userId
      storyId
      reviewVoteStatus
      createdAt
      updatedAt
    }
    next_cursor {
      id
      text
      type
      helpful_score
      funny_score
      userId
      storyId
      reviewVoteStatus
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetRecentUserReviewsQuery__
 *
 * To run a query within a React component, call `useGetRecentUserReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentUserReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentUserReviewsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      time_range: // value for 'time_range'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetRecentUserReviewsQuery(baseOptions: Apollo.QueryHookOptions<GetRecentUserReviewsQuery, GetRecentUserReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecentUserReviewsQuery, GetRecentUserReviewsQueryVariables>(GetRecentUserReviewsDocument, options);
      }
export function useGetRecentUserReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentUserReviewsQuery, GetRecentUserReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecentUserReviewsQuery, GetRecentUserReviewsQueryVariables>(GetRecentUserReviewsDocument, options);
        }
export type GetRecentUserReviewsQueryHookResult = ReturnType<typeof useGetRecentUserReviewsQuery>;
export type GetRecentUserReviewsLazyQueryHookResult = ReturnType<typeof useGetRecentUserReviewsLazyQuery>;
export type GetRecentUserReviewsQueryResult = Apollo.QueryResult<GetRecentUserReviewsQuery, GetRecentUserReviewsQueryVariables>;
export const GetStoryByIdDocument = gql`
    query getStoryById($id: Int!) {
  getStoryById(id: $id) {
    id
    title
    overview
    up_vote
    down_vote
    cover_url
    status
    tags
    createdAt
    creator {
      id
      username
      avatar_url
      endorsed
      about
    }
  }
}
    `;

/**
 * __useGetStoryByIdQuery__
 *
 * To run a query within a React component, call `useGetStoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStoryByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetStoryByIdQuery(baseOptions: Apollo.QueryHookOptions<GetStoryByIdQuery, GetStoryByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStoryByIdQuery, GetStoryByIdQueryVariables>(GetStoryByIdDocument, options);
      }
export function useGetStoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStoryByIdQuery, GetStoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStoryByIdQuery, GetStoryByIdQueryVariables>(GetStoryByIdDocument, options);
        }
export type GetStoryByIdQueryHookResult = ReturnType<typeof useGetStoryByIdQuery>;
export type GetStoryByIdLazyQueryHookResult = ReturnType<typeof useGetStoryByIdLazyQuery>;
export type GetStoryByIdQueryResult = Apollo.QueryResult<GetStoryByIdQuery, GetStoryByIdQueryVariables>;
export const GetSubStoriesFromStoryIdDocument = gql`
    query GetSubStoriesFromStoryId($storyId: Int!) {
  getSubStoriesFromStoryId(storyId: $storyId) {
    id
    title
    text
    order_index
    storyId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetSubStoriesFromStoryIdQuery__
 *
 * To run a query within a React component, call `useGetSubStoriesFromStoryIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubStoriesFromStoryIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubStoriesFromStoryIdQuery({
 *   variables: {
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useGetSubStoriesFromStoryIdQuery(baseOptions: Apollo.QueryHookOptions<GetSubStoriesFromStoryIdQuery, GetSubStoriesFromStoryIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubStoriesFromStoryIdQuery, GetSubStoriesFromStoryIdQueryVariables>(GetSubStoriesFromStoryIdDocument, options);
      }
export function useGetSubStoriesFromStoryIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubStoriesFromStoryIdQuery, GetSubStoriesFromStoryIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubStoriesFromStoryIdQuery, GetSubStoriesFromStoryIdQueryVariables>(GetSubStoriesFromStoryIdDocument, options);
        }
export type GetSubStoriesFromStoryIdQueryHookResult = ReturnType<typeof useGetSubStoriesFromStoryIdQuery>;
export type GetSubStoriesFromStoryIdLazyQueryHookResult = ReturnType<typeof useGetSubStoriesFromStoryIdLazyQuery>;
export type GetSubStoriesFromStoryIdQueryResult = Apollo.QueryResult<GetSubStoriesFromStoryIdQuery, GetSubStoriesFromStoryIdQueryVariables>;
export const GetUserByIdDocument = gql`
    query getUserById($id: Int!) {
  getUserById(id: $id) {
    id
    username
    avatar_url
    endorsed
    about
    createdAt
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    avatar_url
    about
    createdAt
    endorsed
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SearchStoryDocument = gql`
    query SearchStory($title: String!, $tags: String, $limit: Int!, $cursor: Int) {
  searchStory(title: $title, tags: $tags, limit: $limit, cursor: $cursor) {
    stories {
      id
      title
      overview
      cover_url
      up_vote
      down_vote
      tags
      creator {
        username
      }
    }
    next_cursor {
      id
    }
  }
}
    `;

/**
 * __useSearchStoryQuery__
 *
 * To run a query within a React component, call `useSearchStoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchStoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchStoryQuery({
 *   variables: {
 *      title: // value for 'title'
 *      tags: // value for 'tags'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSearchStoryQuery(baseOptions: Apollo.QueryHookOptions<SearchStoryQuery, SearchStoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchStoryQuery, SearchStoryQueryVariables>(SearchStoryDocument, options);
      }
export function useSearchStoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchStoryQuery, SearchStoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchStoryQuery, SearchStoryQueryVariables>(SearchStoryDocument, options);
        }
export type SearchStoryQueryHookResult = ReturnType<typeof useSearchStoryQuery>;
export type SearchStoryLazyQueryHookResult = ReturnType<typeof useSearchStoryLazyQuery>;
export type SearchStoryQueryResult = Apollo.QueryResult<SearchStoryQuery, SearchStoryQueryVariables>;
export const StoriesNewDocument = gql`
    query StoriesNew($limit: Int!, $cursor: Int) {
  getNewStories(limit: $limit, cursor: $cursor) {
    stories {
      id
      title
      overview
      cover_url
      createdAt
      up_vote
      down_vote
      tags
      creator {
        username
      }
    }
    next_cursor {
      id
    }
  }
}
    `;

/**
 * __useStoriesNewQuery__
 *
 * To run a query within a React component, call `useStoriesNewQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoriesNewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoriesNewQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useStoriesNewQuery(baseOptions: Apollo.QueryHookOptions<StoriesNewQuery, StoriesNewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoriesNewQuery, StoriesNewQueryVariables>(StoriesNewDocument, options);
      }
export function useStoriesNewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoriesNewQuery, StoriesNewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoriesNewQuery, StoriesNewQueryVariables>(StoriesNewDocument, options);
        }
export type StoriesNewQueryHookResult = ReturnType<typeof useStoriesNewQuery>;
export type StoriesNewLazyQueryHookResult = ReturnType<typeof useStoriesNewLazyQuery>;
export type StoriesNewQueryResult = Apollo.QueryResult<StoriesNewQuery, StoriesNewQueryVariables>;
export const StoriesTopDocument = gql`
    query StoriesTop($limit: Int!, $cursor: TopStoryCursor, $time_range: Int) {
  getTopStories(limit: $limit, cursor: $cursor, time_range: $time_range) {
    stories {
      id
      title
      overview
      createdAt
      cover_url
      up_vote
      down_vote
      tags
      creator {
        username
      }
    }
    next_cursor {
      id
      up_vote
      down_vote
    }
  }
}
    `;

/**
 * __useStoriesTopQuery__
 *
 * To run a query within a React component, call `useStoriesTopQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoriesTopQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoriesTopQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      time_range: // value for 'time_range'
 *   },
 * });
 */
export function useStoriesTopQuery(baseOptions: Apollo.QueryHookOptions<StoriesTopQuery, StoriesTopQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoriesTopQuery, StoriesTopQueryVariables>(StoriesTopDocument, options);
      }
export function useStoriesTopLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoriesTopQuery, StoriesTopQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoriesTopQuery, StoriesTopQueryVariables>(StoriesTopDocument, options);
        }
export type StoriesTopQueryHookResult = ReturnType<typeof useStoriesTopQuery>;
export type StoriesTopLazyQueryHookResult = ReturnType<typeof useStoriesTopLazyQuery>;
export type StoriesTopQueryResult = Apollo.QueryResult<StoriesTopQuery, StoriesTopQueryVariables>;