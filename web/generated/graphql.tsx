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
  next_cursor: Review;
};

export type PaginatedStory = {
  __typename?: 'PaginatedStory';
  stories: Array<Story>;
  next_cursor: Story;
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
  time_range?: Maybe<Scalars['String']>;
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
  time_range?: Maybe<Scalars['String']>;
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'about' | 'createdAt'>
  )> }
);


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