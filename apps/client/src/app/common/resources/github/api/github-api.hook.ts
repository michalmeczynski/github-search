import axios from "axios";

import { useApi } from "../../api/api.hook";

export const useGithubApi = () => useApi(client);

const client = axios.create({
  baseURL: `http://localhost:3000/github-api`,
  headers: {
    "Content-Type": "application/json"
  }
});
