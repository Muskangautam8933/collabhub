import chalk from "chalk";
import type { MiddlewareFunction } from "react-router";

export const loggingMiddleware: MiddlewareFunction = async (
  { request },
  next,
) => {
  const url = new URL(request.url);
  console.log(chalk.blue(`Starting navigation: ${url.pathname}${url.search}`));
  const start = performance.now();
  await next();
  const duration = performance.now() - start;
  console.log(chalk.blue(`Navigation took ${duration}ms`));
};
