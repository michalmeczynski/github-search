export type GithubUserSearchRequest = {
  page: number;
  per_page: number;
  q: string;
};

export type GithubUserSearchRequestQueryParams = {
  page: number;
  per_page: number;
  q: string;
};

export type GithubUserSearchResponse = {
  items: GithubUserSearchResponse.Item[];
  total_count: number;
};

export namespace GithubUserSearchResponse {
  export type Item = {
    avatar_url: string;
    login: string;
  };
}
