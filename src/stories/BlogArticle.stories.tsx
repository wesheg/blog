import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlogArticle } from "@ui/components";

const meta = {
  title: "BlogArticle",
  component: BlogArticle,
} satisfies Meta<typeof BlogArticle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Hello World",
    featuredImg: {
      src: "/assets/articleMobileTest-1000.png",
      srcSet: `/assets/articleMobileTest-1000.png 1000w,
               /assets/articleMobileTest-1500.png 1500w,
               /assets/articleMobileTest-2000.png 2000w`,
      alt: "Featured Image",
    },
  },
};
