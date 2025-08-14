/** Dependencies */
import type { Request, Response } from 'express';

/**
 * @brief Get API information
 * @description Returns information about the API
 * @example
 * router.get('/', apiController.getApiInfo);
 */
class ApiController {
  /**
   * @brief Get API information
   * @param req - Express request object
   * @param res - Express response object
   * @description Returns information about the API
   * @example
   * router.get('/', apiController.getApiInfo);
   */
  public getApiInfo(req: Request, res: Response): void {
    // Get API information
    res.status(200).json({
      name: 'Moon API',
      description: 'A powerful API for managing your Moon HTPC data',
      version: 'v1',
      availableVersions: ['v1'],
      documentation: 'https://api.example.com/docs',
      status: 'online',
      timestamp: new Date().toISOString(),
      contact: {
        email: 'mscotton.pro@gmail.com'
      }
    });
  }
}

/** Export the controller */
export const apiController = new ApiController();
