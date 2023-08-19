// Hue angles
const ANGLES = 'deg|rad|grad|turn';

// <http://www.w3.org/TR/css3-values/#integers>
const CSS_INTEGER = '[-\\+]?\\d+%?';

// Include CSS3 Module
// <http://www.w3.org/TR/css3-values/#number-value>
const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';

// Include CSS4 Module Hue degrees unit
// <https://www.w3.org/TR/css3-values/#angle-value>
const CSS_ANGLE = `[-\\+]?\\d*\\.?\\d+(?:${ANGLES})?`;

// Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
const CSS_UNIT = `(?:${CSS_NUMBER})|(?:${CSS_INTEGER})`;

// Add angles to the mix
const CSS_UNIT2 = `(?:${CSS_UNIT})|(?:${CSS_ANGLE}?)`;

// Start & end
const START_MATCH = '(?:[\\s|\\(\\s|\\s\\(\\s]+)?';
const END_MATCH = '(?:[\\s|\\)\\s]+)?';
// Components separation
const SEP = '(?:[,|\\s]+)';
const SEP2 = '(?:[,|\\/\\s]*)?';

// Actual matching.
// Parentheses and commas are optional, but not required.
// Whitespace can take the place of commas or opening paren
const PERMISSIVE_MATCH = `${START_MATCH}(${CSS_UNIT2})${SEP}(${CSS_UNIT})${SEP}(${CSS_UNIT})${SEP2}(${CSS_UNIT})?${END_MATCH}`;

const matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT2),
  ANGLES,
  CSS_ANGLE,
  CSS_INTEGER,
  CSS_NUMBER,
  CSS_UNIT2,
  PERMISSIVE_MATCH,
  hwb: new RegExp(`hwb${PERMISSIVE_MATCH}`),
  rgb: new RegExp(`rgb(?:a)?${PERMISSIVE_MATCH}`),
  hsl: new RegExp(`hsl(?:a)?${PERMISSIVE_MATCH}`),
  hsv: new RegExp(`hsv(?:a)?${PERMISSIVE_MATCH}`),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
};

export default matchers;
