import { Context } from 'koa';
import { ServerResponse } from 'http';
import { compile, TokenIndexer } from 'koa-morgan';

function addPadding(word: string | undefined, padding: number): string {
  let target = word;
  if (target === undefined) {
    target = '';
  }

  const pad = ' ';
  const wordLength = target.length;
  const paddingToAdd = padding - wordLength;

  if (paddingToAdd <= 0) {
    return target;
  }

  return target + pad.repeat(paddingToAdd);
}

function formatDate(date: string) {
  return date.toString().replace(/:/g, '-').replace(/\//g, '-').replace(' ', '-');
}

const customDevFormat = (tokens: TokenIndexer, req: Context['req'], res: ServerResponse) => {
  const status = res.headersSent ? res.statusCode : undefined;

  let now = '';
  const ip = '';
  const uid = '';
  let methodLength = 9;

  if (process.env.NODE_ENV === 'production') {
    methodLength = 8;

    now = new Date().toLocaleString('zh-tw', {
      hour12: false,
      timeZone: 'Asia/Taipei',
    });

    now = formatDate(now);
    now = `${addPadding(now, 19)}  `;
  }

  /* eslint-disable no-nested-ternary */
  const color =
    status! >= 500
      ? 31 // red
      : status! >= 400
        ? 33 // yellow
        : status! >= 300
          ? 36 // cyan
          : status! >= 200
            ? 32 // green
            : 0; // no color

  const fn = compile(
    `${now}${ip}\x1b[0m${addPadding(req.method, methodLength)}${addPadding(
      req.url,
      17,
    )} \x1b[${color}m:status\x1b[0m  ${uid}:response-time ms\x1b[0m`,
  );

  return fn(tokens, req, res);
};

export default customDevFormat;
