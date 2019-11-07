'use strict';

const AstNodeInfo = require('../helpers/ast-node-info');
const Rule = require('./base');

// eslint-disable-next-line no-misleading-character-class
const emojiRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c\ude32-\ude3a]|[\ud83c\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/;

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
      // handle eslint-disable-next-line complexity
      ElementNode(node) {
        if (
          AstNodeInfo.hasAttribute(node, 'hidden') ||
          AstNodeInfo.hasAttributeValue(node, 'aria-hidden', 'true')
        ) {
          return;
        }
        // if an element has child elements
        if (AstNodeInfo.hasChildren(node)) {
          let children = AstNodeInfo.childrenFor(node);
          // if the element has only one child element
          if ( children.length === 1 ) {
            // if the only child element is a text node
            let child = children[0];
            if ( AstNodeInfo.isTextNode(child) ) {
              // Search for emojis (TODO: support all glyph)
              let emojiMatches = child.match(emojiRegex);
              if( emojiMatches )
            }
          }
        }
          
          // if that text node is an emoji
          // throw an error
          
        }

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
