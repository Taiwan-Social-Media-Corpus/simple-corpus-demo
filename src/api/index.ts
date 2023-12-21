import Koa from 'koa';
import koaEtag from 'koa-etag';
import bodyParser from 'koa-bodyparser';
import koaConditionalGet from 'koa-conditional-get';

const app = new Koa();

app.use(koaConditionalGet());
app.use(koaEtag());
app.use(bodyParser());

export default app;
