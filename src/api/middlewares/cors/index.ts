import koaCors from '@koa/cors';
import corsOptions from './options';

const cors = () => koaCors(corsOptions);

export default cors;
