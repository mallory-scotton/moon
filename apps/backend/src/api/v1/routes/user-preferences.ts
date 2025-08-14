/** Dependencies */
import express, { Router } from 'express';

/** Import UserPreferences controller and validators */
import { userPreferencesController } from '../controllers';

/** Create router */
const router: Router = express.Router();

/**
 * @brief Get the user preferences
 * @description Retrieve the user preferences
 */
router.get('/', userPreferencesController.getUserPreferences);

/**
 * @brief Modify user preferences
 * @description Update the user preferences
 */
router.put('/', userPreferencesController.updateUserPreferences);

/**
 * @brief Patch user preferences
 * @description Partially update the user preferences
 */
router.patch('/', userPreferencesController.patchUserPreferences);

/**
 * @brief Delete user preferences
 * @description Remove the user preferences
 */
router.delete('/', userPreferencesController.resetUserPreferences);

/** Export default */
export default router;
