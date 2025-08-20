/** Dependencies */
import React from 'react';
import { usePoster, UsePosterProps } from './use-poster';

/** Alias an interface for the component props */
export interface PosterProps extends UsePosterProps {}

/** Export the component */
const Poster: React.FC<PosterProps> = (props: PosterProps) => {
  /** Use the component hook */
  const { getBaseProps } = usePoster({ ...props });

  /** Return the component */
  return (
    <div {...getBaseProps()}>
      Moon.Poster
    </div>
  );
};

/** Set the display name of the component */
Poster.displayName = 'Moon.Poster';

/** Export the component as default */
export default Poster;
