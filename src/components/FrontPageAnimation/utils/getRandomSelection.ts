/**
 * Return a random object from a given array of `choices`.
 *
 * @param {Array<any>} choices - An array representing the set of all possible options
 * @returns {any} - an object from the `choices` array.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getRandomSelection(choices: any[]) {
  return choices[Math.floor(Math.random() * choices.length)];
}
