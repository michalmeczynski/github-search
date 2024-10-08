import cors from "cors";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const corsOption = {
  origin: ["http://localhost:4200"]
};

app.use(cors(corsOption));

app.all("/github-api/*", async (req, res) => {
  createProxyMiddleware({
    changeOrigin: true,
    logger: console,
    on: {
      error: (err) => console.error(err),
      proxyReq: (req) => {
        if (process.env.GITHUB_API_TOKEN) {
          req.setHeader("authorization", `Bearer ${process.env.GITHUB_API_TOKEN}`);
        }
      }
    },
    pathRewrite: {
      "^/github-api": ""
    },
    target: "https://api.github.com"
  })(req, res);
});

app.listen(3000, "localhost", () => {
  console.info(`[ ready ] http://localhost:${3000}`);
});
