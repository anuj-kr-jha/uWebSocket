import 'dotenv/config';
import { App } from 'uWebSockets.js';

const { PORT } = process.env;

const SOCKETS = [];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

App()
  .get('/ping', async (res, req) => {
    const headers: any[] = [];
    // prettier-ignore
    res.onAborted(() => { res.aborted = true });

    req.forEach(header => headers.push({ [header]: req.getHeader(header) }));
    const payload = {
      header: headers,
      query: req.getQuery(),
    };

    // console.log(payload);

    // await delay(100);

    if (!res.aborted) res.end(JSON.stringify(payload));
  })
  .get('*', (res, req) => {
    res.end('not found');
  })
  .listen(Number(PORT), token => {
    if (token) console.log(`Listening to port ${PORT}`);
    else console.log(`Failed to listen to port ${PORT}`);
  });
