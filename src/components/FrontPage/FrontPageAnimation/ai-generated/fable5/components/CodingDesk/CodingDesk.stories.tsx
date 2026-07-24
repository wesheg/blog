import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CodingDesk from ".";

const meta = {
  title: "AI Generated/Fable5",
  component: CodingDesk,
} satisfies Meta<typeof CodingDesk>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Layout follows the viewport: mobile styling below 1000px, desktop above. */
export const Default: Story = {};

/** Small-screen styling regardless of viewport width. */
export const ForceMobile: Story = {
  args: {
    forceMobile: true,
  },
};
