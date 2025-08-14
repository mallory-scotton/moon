/** Dependencies */
import type { Request, Response } from 'express';
import { User, UserPreferences } from '@moon/database';

/**
 * @brief User preferences controller
 * @description This controller handles user preferences-related actions.
 */
class UserPreferencesController {
  public async getUserPreferences(req: Request, res: Response): Promise<void> {}
  public async updateUserPreferences(req: Request, res: Response): Promise<void> {}
  public async patchUserPreferences(req: Request, res: Response): Promise<void> {}
  public async resetUserPreferences(req: Request, res: Response): Promise<void> {}
}

/** Export default instance */
export const userPreferencesController = new UserPreferencesController();
