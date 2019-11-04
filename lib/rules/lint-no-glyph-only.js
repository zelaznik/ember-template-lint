'use strict';

const Rule = require('./base');

module.exports = class NoGlyphOnly extends Rule {
  visitor() {
    return {
      // Setup node source, existing types, etc. here
      if(xxx) {
        // Conditional statements for catching rule violation

        this.log({
          message: 'Error Message to Report',
          line: node.loc && node.loc.start.line,
          column: node.loc && node.loc.start.column,
          source: this.sourceForNode(node),
        });
      },
    };
  }
};
