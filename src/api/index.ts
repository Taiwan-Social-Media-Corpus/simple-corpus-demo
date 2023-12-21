import Koa from 'koa';
import koaEtag from 'koa-etag';
import router from '@routes';
import cors from '@middlewares/cors';
import bodyParser from 'koa-bodyparser';
import logger from '@middlewares/logger';
import koaConditionalGet from 'koa-conditional-get';

const app = new Koa();

app.use(koaConditionalGet());
app.use(koaEtag());
app.use(bodyParser());
app.use(cors());
app.use(logger());

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
