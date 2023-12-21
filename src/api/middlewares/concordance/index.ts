import { z } from 'zod';
import { Middleware } from 'koa';
import { RequestBody, ConcordanceRequest } from 'types';

const schema = z
  .object({
    word: z.string().min(1),
    media: z.string().nullable(),
    cqlEnable: z.boolean(),
    postType: z.string().nullable(),
    boards: z.array(z.string().min(1)).min(1).nullable(),
    start: z.string().min(1),
    end: z.string().min(1),
    windowSize: z.string().min(1),
    page: z.number(),
    fetchNumber: z.number(),
  })
  .strict();

const validateConcordanceDto: Middleware<any, RequestBody<ConcordanceRequest>> = (ctx, next) => {
  const result = schema.safeParse(ctx.request.body);
  if (!result.success) {
    ctx.status = 422;
    ctx.body = { status: 'failed', msg: 'Invalid request body' };
    return null;
  }

  const { start, end, word, cqlEnable } = ctx.request.body;
  if (Number(start) > Number(end)) {
    ctx.status = 422;
    ctx.body = { status: 'failed', msg: 'Start-end year inconsistency' };
    return null;
  }

  const cqlPattern = /^\s*$|[(["'`].*?[)\]"'`]|[|]/g;
  const shouldDisable = !cqlPattern.test(word) && cqlEnable === true;
  const shouldEnable = cqlPattern.test(word) && cqlEnable === false;

  if (shouldDisable || shouldEnable) {
    const errorMessage = shouldDisable ? 'disable' : 'enable';
    ctx.status = 422;
    ctx.body = { status: 'failed', msg: `Please ${errorMessage} CQL query in request body` };
    return null;
  }

  return next();
};

export default validateConcordanceDto;
