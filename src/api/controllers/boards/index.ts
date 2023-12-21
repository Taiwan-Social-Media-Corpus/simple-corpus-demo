import { Middleware } from '@koa/router';
import { request, getBlacklabURL } from '@utils/blacklab';
import { Boards } from 'types';
import buildBoardDto from './utils';

const handleGetBoards: Middleware = async (ctx) => {
  const url = getBlacklabURL({ kind: 'boards' });
  const result = await request<Boards>({ url });
  if (result.err) {
    ctx.status = result.val.status;
    ctx.body = result.val.body;
    return null;
  }

  const boards = Object.keys(result.val.fieldValues);
  const dto = {
    ptt: buildBoardDto(boards, /.*(?=-ptt)/),
    dcard: buildBoardDto(boards, /.*(?=-dcard)/),
  };

  const { type } = ctx.request.query as { type: keyof typeof dto | undefined };
  const filteredData = type === undefined ? dto : { [`${type}`]: dto[type] };
  ctx.body = { status: 'success', data: filteredData };
  return null;
};

export default handleGetBoards;
