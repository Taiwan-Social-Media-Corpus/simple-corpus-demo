import Router from '@koa/router';
import handleGetBoards from '@controllers/boards';
import handleGetConcordance from '@controllers/concordance';
import validateConcordanceDto from '@middlewares/concordance';

const router = new Router({ prefix: '/corpus' });

router.post('/concordance', validateConcordanceDto, handleGetConcordance);
router.get('/boards', handleGetBoards);

export default router;
