import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Article } from "@ui/components";

const meta = {
  title: "Article",
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slug: "/",
    title: "A Very Interesting Article",
    description:
      "A lengthy description that describes this article. No more than 2-3 sentences.",
    wordLength: 500,
  },
};
