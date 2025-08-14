/** Dependencies */
import joi from 'joi';
import { LanguageCode } from '@moon/types';

/**
 * @brief User validation schemas
 * @description This object contains Joi validation schemas for user-related data.
 */
export const usersValidators: {
  createUser: joi.ObjectSchema<{
    name: string;
    password?: string;
    language: LanguageCode;
  }>;
  updateUser: joi.ObjectSchema<{
    name: string;
    password?: string;
    language: LanguageCode;
  }>;
  patchUser: joi.ObjectSchema<{
    name?: string;
    password?: string;
    language?: LanguageCode;
  }>;
} = {
  createUser: joi.object({
    name: joi.string().required().min(2).max(100),
    password: joi
      .string()
      .min(4)
      .max(4)
      .optional()
      .pattern(/^[0-9]+$/),
    language: joi
      .string()
      .valid(...Object.values(LanguageCode))
      .required()
  }),
  updateUser: joi.object({
    name: joi.string().min(2).max(100),
    password: joi
      .string()
      .min(4)
      .max(4)
      .optional()
      .pattern(/^[0-9]+$/),
    language: joi.string().valid(...Object.values(LanguageCode))
  }),
  patchUser: joi.object({
    name: joi.string().min(2).max(100).optional(),
    password: joi
      .string()
      .min(4)
      .max(4)
      .optional()
      .pattern(/^[0-9]+$/),
    language: joi.string().valid(...Object.values(LanguageCode))
  })
};
