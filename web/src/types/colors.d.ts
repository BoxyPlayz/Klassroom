type HEX = `#${string}`;
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HSL = `hsl(${number}, ${number}%, ${number}%)`;
type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`;

type namedColor =
  | "black"
  | "silver"
  | "gray"
  | "white"
  | "maroon"
  | "red"
  | "purple"
  | "fuchsia"
  | "green"
  | "lime"
  | "olive"
  | "yellow"
  | "navy"
  | "blue"
  | "teal"
  | "aqua";

/**
 * A standard color, for use in CSS
 * @example
 * const blue: color = "#0000ff";
 * const p = document.getElementById("paragraph");
 * p.style.color = blue;
 */
export type color = RGB | RGBA | HEX | HSL | HSLA | namedColor;
