/** Dependencies */
import type { Request, Response } from 'express';
import { User, UserPreferences } from '@moon/database';
import crypto from 'crypto';
import { usersValidators } from '../validators';
import { InferType } from '../../types';

/**
 * @brief Users controller
 * @description This controller handles user-related actions.
 */
class UsersController {
  /**
   * @brief Create user
   * @description Create a new user
   */
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      // Destructure request body
      const { name, password, language } = req.value as InferType<typeof usersValidators.createUser>;

      // Generate salt
      const salt = password ? crypto.randomBytes(16).toString('hex') : null;

      // Hash password if provided
      const hashedPassword = password ? crypto.pbkdf2Sync(password, salt!, 1000, 64, 'sha512').toString('hex') : null;

      // Create user
      const user = await User.create({
        hashed_password: hashedPassword,
        salt: salt,
        name: name
      });

      // Create user preferences
      const preferences = await user.createPreferences({
        language: language,
        default_audio_language: language,
        default_subtitle_language: language,
        default_video_language: language,
        user_id: user.id
      });

      // Respond with created user
      res.status(201).json({
        ...user,
        preferences
      });
    } catch (error) {
      // Handle errors
      res.status(500).json({ code: 500, error: 'Internal Server Error' });
    }
  }

  /**
   * @brief Get all users
   * @description Retrieve a list of all users
   */
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all users with their preferences
      const users = await User.findAll({ include: [{ model: UserPreferences }] });

      // Respond with the list of users
      res.status(200).json({
        results: users,
        page: 1,
        total_pages: 1,
        total_results: users.length
      });
    } catch (error) {
      // Handle errors
      res.status(500).json({ code: 500, error: 'Internal Server Error' });
    }
  }

  /**
   * @brief Get user by ID
   * @description Retrieve a user by their unique identifier
   */
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      // Find user by ID
      const user = await User.findByPk(req.params.id, { include: [{ model: UserPreferences }] });

      // Check if user exists
      if (!user) {
        res.status(404).json({ code: 404, error: 'User Not Found' });
        return;
      }

      // Respond with user data
      res.status(200).json(user);
    } catch (error) {
      // Handle errors
      res.status(500).json({ code: 500, error: 'Internal Server Error' });
    }
  }

  /**
   * @brief Update user by ID
   * @description Update the details of a user by their unique identifier
   */
  public async updateUserById(req: Request, res: Response): Promise<void> {
    try {
      // Destructure request body
      const { name, password, language } = req.value as InferType<typeof usersValidators.updateUser>;

      // Find user by ID
      const user = await User.findByPk(req.params.id);

      // Check if user exists
      if (!user) {
        res.status(404).json({ code: 404, error: 'User Not Found' });
        return;
      }

      // Update user details
      user.name = name;

      // Hash password if provided
      if (password) {
        const salt = crypto.randomBytes(16).toString('hex');
        user.hashed_password = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        user.salt = salt;
      }

      // Save updated user
      await user.save();

      // Update user preferences
      const preferences = await user.getPreferences();

      // Update preferences if they exist
      if (preferences) {
        preferences.language = language;
        await preferences.save();
      }

      // Respond with updated user
      res.status(200).json({
        ...user.toJSON(),
        preferences
      });
    } catch (error) {
      // Handle errors
      res.status(500).json({ code: 500, error: 'Internal Server Error' });
    }
  }

  /**
   * @brief Delete user by ID
   * @description Remove a user by their unique identifier
   */
  public async deleteUserById(req: Request, res: Response): Promise<void> {
    try {
      // Check if the user exists
      const user = await User.findByPk(req.params.id);

      // Check if user exists
      if (!user) {
        // User not found
        res.status(404).json({ code: 404, error: 'User Not Found' });
        return;
      }

      // Delete user
      await user.destroy();

      // Respond with success
      res.status(204).json({ code: 204, message: 'User Deleted Successfully' });
    } catch (error) {
      // Handle errors
      res.status(500).json({ code: 500, error: 'Internal Server Error' });
    }
  }

  /**
   * @brief Patch user by ID
   * @description Partially update the details of a user by their unique identifier
   */
  public async patchUserById(req: Request, res: Response): Promise<void> {
    try {
      // Destructure request body
      const { name, password, language } = req.value as InferType<typeof usersValidators.patchUser>;

      // Find user by ID
      const user = await User.findByPk(req.params.id);

      // Check if user exists
      if (!user) {
        res.status(404).json({ code: 404, error: 'User Not Found' });
        return;
      }

      // Update user details
      if (name) {
        user.name = name;
      }

      // Hash password if provided
      if (password) {
        const salt = crypto.randomBytes(16).toString('hex');
        user.hashed_password = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        user.salt = salt;
      }

      // Save updated user
      await user.save();

      // Update user preferences
      const preferences = await user.getPreferences();

      // Update preferences if they exist
      if (preferences && language) {
        preferences.language = language;
        await preferences.save();
      }

      // Respond with updated user
      res.status(200).json({
        ...user.toJSON(),
        preferences
      });
    } catch (error) {
      // Handle errors
      res.status(500).json({ code: 500, error: 'Internal Server Error' });
    }
  }
}

/** Export default instance */
export const usersController = new UsersController();
