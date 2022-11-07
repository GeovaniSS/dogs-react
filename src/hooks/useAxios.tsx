import React from 'react';

import { AxiosError, AxiosRequestConfig } from 'axios';
import { dogsApi } from '../api';

export const useAxios = () => {
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(
    async (url: string, options?: AxiosRequestConfig) => {
      let response, data;
      try {
        setError(null);
        setLoading(true);
        response = await dogsApi(url, options);
        data = response.data
      } catch (error: AxiosError | any) {
        data = null;
        response = error;
        setError(error.response.data.message);
      } finally {
        setData(data);
        setLoading(false);
      }
      return { response, data };
    },
    []
  );

  return { data, error, loading, request };
};
