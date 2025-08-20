/** Dependencies */
import { Meta } from '@storybook/react';
import { poster } from '@moon/theme';

/** Import the component */
import { Poster, PosterProps } from '../src';

/**
 * Poster components to display movie/tv shows poster
 */
export default {
  title: 'Components/Poster',
  component: Poster
} as Meta<typeof Poster>;

/** Define the default props */
const defaultProps = {
  ...poster.defaultVariants
};

/** Define the main template */
const Template = (args: PosterProps) => <Poster {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps
  }
};
