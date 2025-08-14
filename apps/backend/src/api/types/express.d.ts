/** Dependencies */
import 'express';

/** Declare global */
declare global {
  /** Extend Express Request interface */
  namespace Express {
    interface Request {
      /**
       * @brief Custom value for the request.
       * @description This property can be used to store any value that is needed
       * during the request lifecycle, such as validated data from a middleware.
       */
      value: any;
    }
  }
}
