import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleLink } from "@ui/components";

const meta = {
  title: "ArticleLink",
  component: ArticleLink,
} satisfies Meta<typeof ArticleLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slug: "/",
    title: "A Very Interesting Article",
    description:
      "A lengthy description that describes this article. No more than 2-3 sentences.",
    wordLength: 500,
    featuredImg: {
      src: "/assets/articleMobileTest-1000.png",
      srcSet: `/assets/articleMobileTest-1000.png 1000w,
               /assets/articleMobileTest-1500.png 1500w,
               /assets/articleMobileTest-2000.png 2000w`,
      alt: "Featured Image",
    },
    thumbnailImg: {
      src: "/assets/articleDesktopTest-500.png",
      srcSet: `/assets/articleDesktopTest-500.png 500w,
               /assets/articleDesktopTest-1000.png 1000w,
               /assets/articleDesktopTest-1500.png 1500w`,
      alt: "Featured Image",
    },
  },
};
