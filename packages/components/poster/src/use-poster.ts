/** Dependencies */
import { useMemo, useCallback } from 'react';
import {
  poster,
  PosterSlots,
  PosterVariantProps,
  SlotsToClasses,
  mapPropsVariants,
  objectToDeps,
  PropGetter
} from '@moon/theme';

/** Define default props */
interface Props {
  /**
   * The source of the poster image
   */
  src: string;

  /**
   * The title of the poster
   */
  title?: string;

  /**
   * The subtitle of the poster
   */
  subtitle?: string;

  /**
   * The progress of the poster
   */
  progress?: number;

  /**
   * Classname or List of classes to change the classNames of the element
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Poster classNames={ {
   *   base:"base-classes",
   *   ...
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<PosterSlots>;
}

/** Create the props for the component */
export type UsePosterProps = Props & PosterVariantProps;

/**
 * Custom hook for the component
 * @param props The props of the component
 * @returns Custom hook designed for the component
 */
export const usePoster = (props: UsePosterProps) => {
  const [omittedProps, variantProps] = mapPropsVariants(props, poster.variantKeys);

  /** Split the props and set defaults */
  const { classNames, subtitle, title, src, progress } = omittedProps;

  /** Get the memo for the slots */
  const slots = useMemo(() => poster(variantProps), [objectToDeps(variantProps)]);

  /** Prepare callbacks function for each slots */
  const getBaseProps = useCallback<PropGetter>(() => {
    return { className: slots.base({ class: classNames?.base }) };
  }, [slots, classNames?.base]);

  const getTitleProps = useCallback<PropGetter>(() => {
    return { className: slots.title({ class: classNames?.title }) };
  }, [slots, classNames?.title]);

  const getSubTitleProps = useCallback<PropGetter>(() => {
    return { className: slots.subtitle({ class: classNames?.subtitle }) };
  }, [slots, classNames?.subtitle]);

  const getImageProps = useCallback<PropGetter>(() => {
    return { className: slots.image({ class: classNames?.image }) };
  }, [slots, classNames?.image]);

  const getProgressProps = useCallback<PropGetter>(() => {
    return { className: slots.progress({ class: classNames?.progress }) };
  }, [slots, classNames?.progress]);

  /** Return the hook informations */
  return {
    subtitle,
    title,
    src,
    progress,

    getBaseProps,
    getTitleProps,
    getSubTitleProps,
    getImageProps,
    getProgressProps
  };
};
