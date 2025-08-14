/** Dependencies */
import express, { Router } from 'express';
import { validator } from '../../middlewares';

/** Import UserPreferences router */
import userPreferencesRouter from './user-preferences';

/** Import Users controller and validators */
import { usersController } from '../controllers';
import { usersValidators } from '../validators';

/** Create router */
const router: Router = express.Router();

/**
 * @brief Create user
 * @description Create a new user
 */
router.post('/', validator.body(usersValidators.createUser), usersController.createUser);

/**
 * @brief Get all users
 * @description Retrieve a list of all users
 */
router.get('/', usersController.getAllUsers);

/**
 * @brief Get user by ID
 * @description Retrieve a user by their unique identifier
 */
router.get('/:id', usersController.getUserById);

/**
 * @brief Update user by ID
 * @description Update the details of a user by their unique identifier
 */
router.put('/:id', validator.body(usersValidators.updateUser), usersController.updateUserById);

/**
 * @brief Patch user by ID
 * @description Partially update the details of a user by their unique identifier
 */
router.patch('/:id', validator.body(usersValidators.patchUser), usersController.patchUserById);

/**
 * @brief Delete user by ID
 * @description Remove a user by their unique identifier
 */
router.delete('/:id', usersController.deleteUserById);

/** Mount UserPreferences router */
router.use('/:id/preferences', userPreferencesRouter);

/** Export default */
export default router;
