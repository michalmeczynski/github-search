import { ApiResponse } from "../../../api/api.hook";
import { useGithubApi } from "../../api/github-api.hook";
import {
  GithubUserSearchRequest,
  GithubUserSearchRequestQueryParams,
  GithubUserSearchResponse
} from "./github-user-search.dto";

export const useGithubUserApi = () => {
  const api = useGithubApi();

  const search = ({
    abortSignal,
    request
  }: {
    abortSignal: AbortSignal;
    request: GithubUserSearchRequest;
  }): Promise<ApiResponse<GithubUserSearchResponse>> => {
    const queryParams: GithubUserSearchRequestQueryParams = {
      page: request.page,
      per_page: request.per_page,
      q: request.q
    };

    return api.get<GithubUserSearchResponse>({
      abortSignal,
      path: "search/users",
      queryParams
    });
  };

  return {
    search
  };
};
