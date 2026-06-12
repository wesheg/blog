import { Fraunces } from "next/font/google";

/**
 * Calculate how long it would take to read an article given its word count.
 * Return the result as whole minutes in a string (e.g. "11 min read").
 *
 * @param {number} articleWordLength - Article word count
 * @returns {string} - ex: "20 min read"
 */
export function getReadTime(articleWordLength: number): string {
  const avgWordsPerMinute = 200;
  const minutes = Math.ceil(articleWordLength / avgWordsPerMinute);
  return `${Math.max(1, minutes).toLocaleString("en-us")} min read`;
}

export const frauncesFont = Fraunces({
  variable: "--article-title-font",
  style: "italic",
  subsets: ["latin"],
});
