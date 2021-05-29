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
  voteReview: Scalars['Boolean'];
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
  avatar_url: Scalars['String'];
};


export type MutationCreateStoryArgs = {
  storyInput: CreateStoryInput;
};


export type MutationUpdateStoryArgs = {
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
  getStoryById?: Maybe<Story>;
  getNewStories: PaginatedStory;
  getTopStories: PaginatedStory;
  getSubStoryById?: Maybe<SubStory>;
  getSubStoriesFromStoryId: Array<SubStory>;
  getReviewById?: Maybe<Review>;
  getHelpfulStoryReviews: PaginatedReview;
  getRecentUserReviews: PaginatedReview;
};


export type QueryGetStoryByIdArgs = {
  id: Scalars['Int'];
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
      & Pick<User, 'username' | 'id' | 'createdAt'>
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

export type UpdateUserAvatarMutationVariables = Exact<{
  avatar_url: Scalars['String'];
}>;


export type UpdateUserAvatarMutation = (
  { __typename?: 'Mutation' }
  & { updateUserAvatar?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'avatar_url'>
  )> }
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
      & Pick<Review, 'id' | 'text' | 'type' | 'helpful_score' | 'funny_score' | 'unhelpful_score' | 'userId' | 'storyId'>
    )>, next_cursor?: Maybe<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'helpful_score'>
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
    & Pick<Story, 'id' | 'title' | 'overview' | 'up_vote' | 'down_vote' | 'cover_url' | 'status' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar_url' | 'endorsed'>
    ) }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'about' | 'createdAt'>
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
      & Pick<Story, 'id' | 'title' | 'overview' | 'cover_url' | 'createdAt'>
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
      & Pick<Story, 'id' | 'title' | 'overview' | 'createdAt' | 'cover_url'>
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
      username
      id
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
export const UpdateUserAvatarDocument = gql`
    mutation UpdateUserAvatar($avatar_url: String!) {
  updateUserAvatar(avatar_url: $avatar_url) {
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
    createdAt
    creator {
      id
      username
      avatar_url
      endorsed
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
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    about
    createdAt
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
export const StoriesNewDocument = gql`
    query StoriesNew($limit: Int!, $cursor: Int) {
  getNewStories(limit: $limit, cursor: $cursor) {
    stories {
      id
      title
      overview
      cover_url
      createdAt
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