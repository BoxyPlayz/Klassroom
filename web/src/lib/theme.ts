import { type color } from "@/types/colors";

interface colorSchemeInterface {
  background: color;
  foreground: color;
  text: color;
  textContrast: color;
  link: color;
  linkSelect: color;
}

export interface theme {
  colors: Record<string, colorSchemeInterface>;
}

const theme: theme = {
  colors: {
    light: {
      background: "#ff00ddff",
      foreground: "#ffd000ff",
      text: "#180045ff",
      textContrast: "#364800ff",
      link: "#008cffff",
      linkSelect: "#8be6ffff",
    },
    dark: {
      background: "hsla(308, 100%, 14%, 1.00)",
      foreground: "hsla(49, 100%, 14%, 1.00)",
      text: "hsla(261, 100%, 86%, 1.00)",
      textContrast: "hsla(75, 100%, 86%, 1.00)",
      link: "hsla(207, 100%, 50%, 1.00)",
      linkSelect: "hsla(193, 100%, 13%, 1.00)",
    },
  },
};

export { theme };
