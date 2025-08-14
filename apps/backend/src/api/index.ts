/** Dependencies */
import express, { Router } from 'express';

/** Import controller */
import { apiController } from './controllers';

/** Import routes */
import v1Router from './v1';

/** Create router */
const router: Router = express.Router();

/** Base route */
router.get('/', apiController.getApiInfo);

/** Mount routes */
router.use('/v1', v1Router);

/** Export default */
export default router;
