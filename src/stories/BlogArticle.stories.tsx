import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlogArticle } from "@ui/components";

const meta = {
  title: "BlogArticle",
  component: BlogArticle,
} satisfies Meta<typeof BlogArticle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
