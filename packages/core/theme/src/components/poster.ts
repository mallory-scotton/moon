/** Dependencies */
import { tv, VariantProps } from 'tailwind-variants';

/**
 * @brief Poster component
 * @description A component that displays a poster image with a title and description.
 */
export const poster = tv({
  slots: {
    base: ''
  },
  variants: {},
  defaultVariants: {},
  compoundVariants: []
});

/**
 * @brief Poster component variants
 * @description The different variants that the poster component can have.
 */
export type PosterVariantProps = VariantProps<typeof poster>;

/**
 * @brief Poster component slots
 * @description The different slots that the poster component can have.
 */
export type PosterSlots = keyof ReturnType<typeof poster>;
