/** Dependencies */
import { Schema } from 'joi';
import { RequestHandler, Request, Response, NextFunction } from 'express';

/**
 * @brief Validator Middleware
 * @description This middleware is used to validate requests against Joi schemas.
 * It provides methods to validate query, params, and body data.
 */
class Validator {
  /**
   * Validate a schema through a middleware
   * @param where The emplacement of the data
   * @param schema The schema to validate
   * @returns A new middleware for the wanted schema
   */
  private validate<T>(where: 'params' | 'query' | 'body', schema: Schema): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
      // Get the schema validation
      const validation = schema.validate(req[where], { abortEarly: true });

      // On error, HTTP error 422
      if (validation.error) {
        res.status(422).json({ code: 422, error: validation.error.details[0].message });
        return;
      }

      // Set the value inside the request
      req.value = validation.value as T;

      // Next handler
      next();
    };
  }

  /**
   * Check the schema validation on the query
   * @param schema The schema to be checked
   * @returns A new middleware
   */
  public query<T = any>(schema: Schema): RequestHandler {
    return this.validate<T>('query', schema);
  }

  /**
   * Check the schema validation on the params
   * @param schema The schema to be checked
   * @returns A new middleware
   */
  public params<T = any>(schema: Schema): RequestHandler {
    return this.validate<T>('params', schema);
  }

  /**
   * Check the schema validation on the body
   * @param schema The schema to be checked
   * @returns A new middleware
   */
  public body<T = any>(schema: Schema): RequestHandler {
    return this.validate<T>('body', schema);
  }
}

// Export the validator
export const validator = new Validator();
