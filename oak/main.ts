import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  console.log("LOG Before Process 1")
  await next();
  console.log("LOG After Process 1")
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  console.log("LOG Before Process 2")
  const start = Date.now();
  await next();
  console.log("LOG After Process 2")
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});


app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });