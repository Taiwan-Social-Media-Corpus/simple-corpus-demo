import koaMorgan from 'koa-morgan';
import customDevFormat from './custom';

koaMorgan.format('custom-dev', customDevFormat);

const logger = () => koaMorgan('custom-dev');

export default logger;
