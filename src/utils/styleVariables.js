const FONT_FAMILIES = {
  ARIAL: 'arial, helvetica, sans-serif',
  ARIAL_NARROW: "'arial narrow', arial, helvetica, sans-serif",
  BRUSH_SCRIPT: "'Brush Script MT', cursive",
  CALIBRI: "Calibri, 'Segoe UI', Candara, Segoe, Optima, Arial, sans-serif",
  CAMBRIA: "cambria, georgia, 'bookman old style', 'times new roman', serif",
  CENTURY_GOTHIC: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif",
  CODE: "'Courier New', Courier, 'Lucida Sans Typewriter', 'Lucida Typewriter', monospace",
  GARAMOND:
    "'Adobe Garamond Pro', Garamond, Baskerville, 'Baskerville Old Face'," +
    "'Hoefler Text', 'Times New Roman', serif",
  BEBAS: '"Bebas Neue", arial, helvetica, sans-serif',
  ROBOTO: 'Roboto, arial, helvetica, sans-serif',
};
const COLORS = {
  GREEN_20: 'rgb(146, 208, 80)',
  GREEN_50: 'rgb(115, 175, 85)',
  GREEN_80: 'rgb(102, 158, 74)',
  ORANGE: 'orange',
  PEACH: 'rgb(255, 230, 149)',
  GRAY38: 'rgb(38,38,38)',
  GRAY41: 'rgb(41, 41, 41)',
  GRAY63: 'rgb(63, 63, 63)',
  GRAY77: 'rgb(77, 77, 77)',
  GRAY83: 'rgb(83, 83, 83)',
  GRAY95: '#5f5f5f',
  // IMPROVEMENTS: make this the logical disabled color
  GRAY180: 'rgb(180, 180, 180)',
  GRAY217: 'rgb(217, 217, 217)',
  LIGHTER_BLUE: 'rgb(190,215,239)',
  LIGHT_BLUE: '#5b9bd5',
  BLUE_50: 'rgb(0, 112, 192)',
  PAYPAL_BLUE: 'rgb(0, 121, 193)',
  BLACK: 'black',
  WHITE: 'white',
  BLACKISH: 'rgb(34, 34, 34)',
  WHITEISH: 'rgb(242, 242, 247)',
  RED: 'red',
  YELLOW: 'yellow',
  MAROON: '#C00000',
  GREEN: 'green',
  GRAY: 'gray',
};

const LOGICAL_COLORS = {
  GENERAL_PAGE_BORDER_COLOR: COLORS.GRAY217,
  // IMPROVEMENTS: change to whiteish but have to visit all pages to see how it looks
  STANDARD_BACKGROUND: COLORS.WHITE,
  STANDARD_TEXT: COLORS.BLACKISH,
  CT_PRIMARY: '#8E131B',
  CT_TEXT_ON_PRIMARY: COLORS.WHITEISH,
  CT_TEXT_ON_SECONDARY: COLORS.WHITEISH,
  CT_TEXT_ON_DARK: COLORS.WHITEISH,
  CT_ACCENT: '#FFC600',
  CT_LIGHTENED_ACCENT: '#bff3ff',
  CT_SECOND: '#07294D',
  CT_THIRD: '#d2b48c',
};

const STYLES = {
  FONT_FAMILIES,
  COLORS,
  LOGICAL_COLORS,
};

const WIDTHS = {
  SIDE_CONTENT_PADDING: '64px',
  CALENDAR_WIDTH_MAX: '1200px',
};

const SIZES = {
  ...WIDTHS,
};

export {FONT_FAMILIES, COLORS, LOGICAL_COLORS, SIZES, WIDTHS};
export default STYLES;
