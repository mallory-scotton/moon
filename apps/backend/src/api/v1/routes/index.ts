/** Dependencies */
import express, { Router } from 'express';

/** Import routers */
import usersRouter from './users';

/** Create router */
const router: Router = express.Router();

/** Mount routers */
router.use('/users', usersRouter);

/** Export default */
export default router;
