// Fixes for SVG

var SVGTextElement;

SVGTextElement.prototype.getBBox = function() {};

// TinyColor

var tinycolor;

/**
 * @constructor
 * @param {string|number} color
 * @param {Object=} options
 * @return {tinycolor}
 */
function tinycolor(color, options){};

tinycolor.prototype.toRgb = function(){};

/**
 * @return {tinycolor}
 */
tinycolor.prototype.mostReadable = function(color, options){};
/**
 * @return {tinycolor}
 */
tinycolor.prototype.darken = function(){};
/**
 * @return {tinycolor}
 */
tinycolor.prototype.lighten = function(){};
/**
 * @return {tinycolor}
 */
tinycolor.prototype.spin = function(){};

