import { send } from '../deps.js';
import { Application, Router } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import { superoak } from "https://deno.land/x/superoak@2.3.1/mod.ts";

const app = new Application();
const router = new Router();

const errorMiddleware = async(context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const requestTimingMiddleware = async({ request }, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${request.method} ${request.url.pathname} - ${ms} ms`);
}

const serveStaticFilesMiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7);

    await send(context, path, {
      root: `${Deno.cwd()}/static`
    });

  } else {
    await next();
  }
}


router.get('/r', requestTimingMiddleware);
router.get('/static/s', serveStaticFilesMiddleware);

app.use(router.routes());

export { app };
export { errorMiddleware, requestTimingMiddleware, serveStaticFilesMiddleware }
