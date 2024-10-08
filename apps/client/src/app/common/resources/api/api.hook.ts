import { Axios, AxiosError, AxiosResponse } from "axios";

export const useApi = (client: Axios) => {
  const handleRequest = async <T>(
    requestFunction: Promise<AxiosResponse<unknown, unknown>>
  ): Promise<ApiResponse<T>> => {
    try {
      const axiosResponse = await requestFunction;

      return {
        data: axiosResponse.data as T,
        status: axiosResponse.status
      };
    } catch (_error) {
      const axiosError = _error as AxiosError;

      let error: ApiError;
      switch (axiosError.code) {
        case "ERR_CANCELED":
          error = ApiError.CANCELED;
          break;
        case "ERR_NETWORK":
          error = ApiError.OFFLINE;
          break;
        default:
          error = ApiError.OTHER;
      }

      throw error;
    }
  };

  const get = async <T>(params: ApiGetParams): Promise<ApiResponse<T>> => {
    const request = client.get(params.path, {
      params: params.queryParams,
      signal: params.abortSignal
    });

    return handleRequest(request);
  };

  return {
    get
  };
};

enum ApiError {
  CANCELED = "CANCELED",
  OFFLINE = "OFFLINE",
  OTHER = "OTHER"
}

type ApiGetParams = {
  abortSignal: AbortSignal;
  path: string;
  queryParams?: ApiQueryParams;
};

type ApiQueryParams = Record<string, unknown>;

export type ApiResponse<Data> = {
  data: Data;
  status: number;
};
