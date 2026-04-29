import { getApi, postApi, requestApi } from '@/app/apiBridge';

export const apiClient = {
  get: getApi,
  post: postApi,
  request: requestApi,
};

export type ApiClient = typeof apiClient;
