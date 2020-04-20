import htm from 'https://unpkg.com/htm@2.2.1/dist/htm.module.js';
import { h } from 'https://unpkg.com/preact@10.0.5/dist/preact.module.js';
const html = htm.bind(h);

import { App } from './app.js';
import { renderToString } from 'https://cdn.pika.dev/preact-render-to-string';
const body = renderToString(html`
  <html>
    <head>
      <script src="/client.js" type="module"></script>
    </head>
    <body>
      <${App} page="All" />
    </body>
  </html>
`);

import {
  Application,
  Router,
  send, //TODO: update this URL once https://github.com/oakserver/oak/pull/58 gets merged 
} from "https://raw.githubusercontent.com/Soremwar/oak/v0.41/mod.ts";
const app = new Application();

const router = new Router();
router
  .get("/", context => {
    context.response.body = body;
  });

app.use(router.routes());
app.use(async context => {
  await send(context, context.request.path, {
    root: Deno.cwd()
  });
});

await app.listen("127.0.0.1:8000");
