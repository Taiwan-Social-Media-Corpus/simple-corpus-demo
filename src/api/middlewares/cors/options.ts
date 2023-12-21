import { Options } from '@koa/cors';

const corsOptions: Options = {
  origin: (ctx) => {
    const allowList = [/http:\/\/localhost:300\d$/];
    const origin = ctx.request.header.origin ?? '';
    const allowed = allowList.some((value) => new RegExp(value).test(origin));

    if (allowed) {
      return origin;
    }

    return '';
  },
  credentials: true,
};

export default corsOptions;
