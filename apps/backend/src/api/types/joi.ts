/** Dependencies */
import type { Schema } from 'joi';

/**
 * @brief Infers the type from a Joi schema
 * @description This utility type extracts the TypeScript type from a Joi schema definition.
 */
export type InferType<T extends Schema> = T extends Schema<infer U> ? U : never;
