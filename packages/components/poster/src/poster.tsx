/** Dependencies */
import React from 'react';
import { usePoster, UsePosterProps } from './use-poster';

/** Alias an interface for the component props */
export interface PosterProps extends UsePosterProps {}

/** Export the component */
const Poster: React.FC<PosterProps> = (props: PosterProps) => {
  /** Use the component hook */
  const {
    getBaseProps,
    getImageProps,
    getProgressProps,
    getSubTitleProps,
    getTitleProps,
    title,
    subtitle,
    src,
    progress
  } = usePoster({ ...props });

  /** Return the component */
  return (
    <div {...getBaseProps()}>
      <div {...getTitleProps()}>{title}</div>
      {subtitle && <div {...getSubTitleProps()}>{subtitle}</div>}
      <img {...getImageProps()} src={src} alt={title} />
      {progress && <div {...getProgressProps()}>{progress}</div>}
    </div>
  );
};

/** Set the display name of the component */
Poster.displayName = 'Moon.Poster';

/** Export the component as default */
export default Poster;
