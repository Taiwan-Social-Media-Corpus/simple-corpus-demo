import { Middleware } from '@koa/router';
import { ConcordanceResponse, ConcordanceRequest, RequestBody } from 'types';
import { request, getBlacklabURL } from '@utils/blacklab';
import { buildTextPattern, buildFilterString } from './query';

function buildQuery(dto: ConcordanceRequest) {
  const { cqlEnable, word, postType, media, boards, start, end, page, fetchNumber, windowSize } =
    dto;
  const patt = buildTextPattern(cqlEnable, word, postType);
  const filter = buildFilterString(media, boards, start, end);
  return {
    patt,
    filter,
    outputformat: 'json',
    first: page * fetchNumber - fetchNumber,
    number: fetchNumber,
    wordsaroundhit: windowSize,
  };
}

const handleGetConcordance: Middleware<any, RequestBody<ConcordanceRequest>> = async (ctx) => {
  const query = buildQuery(ctx.request.body);
  const params = new URLSearchParams(query as any).toString();
  const url = getBlacklabURL({ kind: 'concordance', params });
  const result = await request<ConcordanceResponse>({ url });
  if (result.err) {
    ctx.status = result.val.status;
    ctx.body = result.val.body;
    return null;
  }

  if (!result.val.hits.length) {
    ctx.body = { status: 'success', msg: 'No hit' };
    return null;
  }

  ctx.body = { status: 'success', data: result.val };
  return null;
};

export default handleGetConcordance;
