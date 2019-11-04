'use strict';

const AstNodeInfo = require('../helpers/ast-node-info');
const Rule = require('./base');

module.exports = class NoGlyphOnly extends Rule {
  logNode({ node, message }) {
    return this.log({
      message,
      line: node.loc && node.loc.start.line,
      column: node.loc && node.loc.start.column,
      source: this.sourceForNode(node),
    });
  }
  visitor() {
    return {
      // eslint-disable-next-line complexity
      ElementNode(node) {
        if (
          AstNodeInfo.hasAttribute(node, 'hidden') ||
          AstNodeInfo.hasAttributeValue(node, 'aria-hidden', 'true')
        ) {
          return;
        }

        // if the element has a glyph or emoji as the text content
        // and the element does not have role="img" attribute
        // check for the attributes - aria-label, aria-labelledby, aria-describedby

        // if a span element contains a glyph or emoji as the text content
        // the span element should be marked with the attribute `aria-hidden="true"`

        // if an element is an SVG
        // check for a title (as a child of the SVG?) OR the attribute `aria-hidden="true"`

        // if an element is the only child node AND has the attribute `aria-hidden="true"`
        // check to make sure the parent element has one of these attributes - aria-label, aria-labelledby, aria-describedby

      },

    };
  }
};
