import axios, { AxiosError, InternalAxiosRequestConfig  } from 'axios';

function interceptErrorResponse(error: AxiosError) {
  throw error;
}

async function interceptAuthRequest(currentConfig: InternalAxiosRequestConfig) {
  const token = '';

  if (token && currentConfig && currentConfig.headers) {
    currentConfig.headers['authorization'] = `Bearer ${token}`;
  }

  return currentConfig;
}

export function createApiClient(baseURL: string) {
  const axiosInstance = axios.create();

  axiosInstance.interceptors.response.use((res) => res, interceptErrorResponse);

  axiosInstance.interceptors.request.use(
    interceptAuthRequest,
    interceptErrorResponse
  );

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    use: <ApiType>(api: new (...args: any[]) => ApiType): ApiType =>
      new api(undefined, baseURL, axiosInstance)
  };
}
