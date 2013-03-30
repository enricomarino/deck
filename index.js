/**
 * Dependencies
 */

var Emitter = require('emitter');

/**
 * Expose `Deck`
 */

module.exports = Deck;

/**
 * Utils
 */

var array = [];
var slice = array.slice;

/** 
 * Deck
 * create a deck
 * 
 * @param {Object} [options] options
 *   @param {String} [options.selector] slide selector
 * @api public
 */

function Deck (options) {
  Emitter.call(this);

  var options = options || {};
  var defaults = this.defaults;
  var selector = options.selector || defaults.selector;
  var elements = document.querySelectorAll(selector);

  this.selector = selector;
  this.slides = slice.call(elements);
  this.n = elements.length;
  this.current = 0;
}

/**
 * Inherit from `Emitter.prototype`
 */

Deck.prototype = Object.create(Emitter.prototype);
Deck.prototype.constructor = Deck;

/**
 * Defaults
 */

Deck.prototype.defaults = {
  "selector": "article.slide"
};

/**
 * next
 * Change to next slide.
 *
 * @return {Deck} this for chaining
 * @api public
 */

Deck.prototype.next = function () {
  return this.nth(this.current+1);
};

/**
 * prev
 * Change to the previous slide.
 *
 * @return {Deck} this for chaining
 * @api public
 */

Deck.prototype.prev = function () {
  return this.nth(this.current-1);
};


/**
 * last
 * Change to the last slide.
 *
 * @return {Deck} this for chaining
 * @api public
 */

Deck.prototype.last = function () {
  return this.nth(this.n-1);
};

/**
 * first
 * Change to the first slide.
 *
 * @return {Deck} this for chaining
 * @api public
 */

Deck.prototype.first = function () {
  return this.nth(0);
};

/**
 * nth
 * Change to the *n*-th slide.
 *
 * @param {Number} i slide index
 * @return {Deck} this for chaining
 * @api public
 */

Deck.prototype.nth = function (i) {
  if (i === this.current) {
    return this;
  }
  if (i < 0) {
    return this;
  }
  if (i > this.n-1) {
    return this;
  }
  this.past = this.current;
  this.current = i;
  this.goto(i);
  this.show(i);
  this.emit("slide", this.current, this.past);
  return this;
};

/**
 * goto
 * Change location to the *i*-th slide
 *
 * @param {Number} i slide index
 * @return {Deck} this for chaining
 * @api public
 */

Deck.prototype.goto = function (i) {
  window.location = "#" + i;
  return this;
};

/**
 * show
 * Show the *i*-th slide
 *
 * @param {Number} i slide index
 * @return {Deck} this for chaining
 * @api public
 */

Deck.prototype.show = function (i) {
  this.slides.forEach(function (slide, k) {
    slide.style.display = (i === k) ? "block" : "none";
  });
  return this;
};
