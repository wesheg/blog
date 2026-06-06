import type { Preview } from "@storybook/nextjs-vite";
// @ts-expect-error: allow side-effect import of global CSS without type declarations
import "../src/app/globals.css";
import { Fraunces, Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--preferred-font",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--article-title-font",
  style: "italic",
  subsets: ["latin"],
});

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        light: {
          name: "Light",
          value: "#faf9f5",
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        className={`${roboto.variable} ${fraunces.variable}`}
        style={{
          fontFamily: "var(--preferred-font), Arial, Helvetica, sans-serif",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
