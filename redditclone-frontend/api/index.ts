import { AuthenticationApi, CommentsApi, PostsApi, SubredditsApi, VotesApi } from '@/client-codegen-api';
import { getApiUrl } from '@/utils';
import axiosClient from './axios';

export const authApi = new AuthenticationApi(undefined, getApiUrl(), axiosClient);
export const postApi = new PostsApi(undefined, getApiUrl(), axiosClient);
export const subredditApi = new SubredditsApi(undefined, getApiUrl(), axiosClient);
export const commentApi = new CommentsApi(undefined, getApiUrl(), axiosClient);
export const voteApi = new VotesApi(undefined, getApiUrl(), axiosClient);
