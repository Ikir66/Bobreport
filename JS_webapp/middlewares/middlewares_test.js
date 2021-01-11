import * as middlewares from "./middlewares.js";
import { superoak } from "https://deno.land/x/superoak@2.3.1/mod.ts";
import { app } from "./middlewares.js";

const fun = () => {
};
const fun2 = () => {
    throw Error('hello!');
};
Deno.test("errorMiddleware", async()=> {
    await middlewares.errorMiddleware(fun, fun);
    await middlewares.errorMiddleware(fun, fun2);
});

  Deno.test("serveStaticFilesMiddleware", async()=> {
    const testClient = await superoak(app);
    await testClient.get("/static/s")
  });

  Deno.test("requestTimingMiddleware", async()=> {
    const testClient = await superoak(app);
    await testClient.get("/r")
    .send('a=a')
  });

// deno test --coverage --allow-net --unstable middlewares_test.js
