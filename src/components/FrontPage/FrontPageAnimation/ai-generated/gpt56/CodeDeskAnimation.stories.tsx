import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CodeDeskAnimation from ".";

const meta = {
  title: "AI Generated/GPT56",
  component: CodeDeskAnimation,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    forceSmallScreen: {
      control: "boolean",
      description:
        "Use the small-screen composition regardless of the viewport width.",
    },
  },
} satisfies Meta<typeof CodeDeskAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Layout follows the viewport: mobile below 1,000px and desktop above it. */
export const Default: Story = {
  args: {
    forceSmallScreen: false,
  },
};

/** Small-screen styling regardless of the Storybook viewport width. */
export const ForceSmallScreen: Story = {
  args: {
    forceSmallScreen: true,
  },
};
