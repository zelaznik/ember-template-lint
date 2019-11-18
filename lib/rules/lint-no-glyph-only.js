// General Approach: ElementNode -> TextNode
// ----------------------------------------------------------------------
// -Element has a glyph/emoji as text content ->
//    role="img", aria-label, aria-labelledby, aria-describedby
// -Span element -> `aria-hidden="true"`
// -SVG element  -> `aria-hidden="true"` or <title> child
// -Only child with `aria-hidden="true"` -> parent element
//    must have one of aria-label, aria-labelledby, aria-describedby
// ----------------------------------------------------------------------
// The two main tasks for implementing this rule are:
// -- Parsing TextNodes / identifying glyphs/emojis (code is below the rule)
// -- Examining parent ElementNode attributes (code is within the rule proper)

'use strict';
const AstNodeInfo = require('../helpers/ast-node-info');
const Rule = require('./base');
const HTML_ENTITY_DB = require('../helpers/html-entity-db').HTML_ENTITY_DB;

const HTML_ENTITY_DEC = Object.values(HTML_ENTITY_DB);

// Extract entities
const regexAllEntities = /(&(\S+?);)/gim;
const getAllEntities = strInput => strInput.match(regexAllEntities);

const regexDecimalEntities = /(&#(\d+?);)/gim;
const getdecimalEntity = strInput => strInput.match(regexDecimalEntities);

const regexHexidecimalEntities = /(&#x(\S+?);)/gim;
const gethexidecimalEntity = strInput => strInput.match(regexHexidecimalEntities);

// Process Entities
const convertDecimalEntityToNum = strdecimalEntity =>
  parseInt(strdecimalEntity.substr(2, strdecimalEntity.length - 3), 10);
const convertHexidecimalEntityToHex = strhexidecimalEntity =>
  strhexidecimalEntity.substr(3, strhexidecimalEntity.length - 4);

// Convert Entities
const cvtDecToHex = strDec => parseInt(strDec, 10).toString(16);
const cvtHexToDec = strHex => parseInt(parseInt(strHex, 16).toString(), 10);

// Validate Entities
const isValidCodePoint = intDec => 0 <= intDec && intDec <= 1114111;

const isValidNamedEntity = namedEntities => HTML_ENTITY_DB[namedEntities] !== undefined;

function decEncodesValidGlyph(intDec) {
  return HTML_ENTITY_DEC.filter(entRef => entRef['codepoints'].includes(intDec)).length > 0;
}

const reEmoji = /\p{Emoji}/gu;
function decEncodesValidEmoji(intDec) {
  return reEmoji.test(String.fromCodePoint(intDec));
}
module.exports = class NoGlyphOnly extends Rule {
  logNode({ node, message }) {
    return this.log({
      message: 'Error message',
      line: node.loc && node.loc.start.line,
      column: node.loc && node.loc.start.column,
      source: this.sourceForNode(node),
    });
  }

  visitor() {
    return {
      ElementNode(node) {
        // If the ElementNode has children, see if any of them are TextNodes
        let hasChildren = AstNodeInfo.hasChildren(node);

        if (hasChildren) {
          let childNodesAll = AstNodeInfo.childrenFor(node);
          let childNodesText = childNodesAll.filter(AstNodeInfo.isTextNode);

          // If TextNode child(ren) exist, extract their content
          if (childNodesText.length !== 0) {
            let textContents = childNodesText.map(childNode => this.sourceForNode(childNode));

            // Scan the content for any HTML-entity-like substrings --> &(\S+?);
            let entAll = textContents.map(text => getAllEntities(text));

            // Parse the (possible) entities into groups based on their encoding:

            // Base-10 format --> &#(\d+?);
            let decimalEntity = entAll.map(allEntitiesArray =>
              allEntitiesArray.filter(anyEntityType => getdecimalEntity(anyEntityType))
            );

            // Hex format --> &#x(\S+?);
            let hexidecimalEntity = entAll.map(allEntitiesArray =>
              allEntitiesArray.filter(anyEntityType => gethexidecimalEntity(anyEntityType))
            );

            // Named entity format ( the remainders )
            let namedEntities = entAll.map(allEntitiesArray =>
              allEntitiesArray.filter(
                anyEntityType => !getdecimalEntity(anyEntityType) && !gethexidecimalEntity(anyEntityType)
              )
            );

            // Check possible `named entities` against the official HTML spec database
            let validNamedEntity = namedEntities.map(namedEntitiesArr =>
              namedEntitiesArr.filter(isValidNamedEntity)
            );

            // Dec and Hex Entities: convert to base-10 numbers
            let hexidecimalEntityCvtHex = hexidecimalEntity.map(hexidecimalEntityArr =>
              hexidecimalEntityArr.map(convertHexidecimalEntityToHex)
            );
            let hexidecimalEntityCvtDec = hexidecimalEntityCvtHex.map(hexidecimalEntityCvtArr =>
              hexidecimalEntityCvtArr.map(cvtHexToDec)
            );
            let decimalEntityCvtDec = decimalEntity.map(decimalEntityArr =>
              decimalEntityArr.map(convertDecimalEntityToNum)
            );

            // Validate Code Points of Base-10 Versions
            let hexidecimalEntityCvtDecValidCP = hexidecimalEntityCvtDec.map(HexToDecArr =>
              HexToDecArr.filter(isValidCodePoint)
            );
            let decimalEntityCvtDecValidCP = decimalEntityCvtDec.map(DecToDecArr =>
              DecToDecArr.filter(isValidCodePoint)
            );

            // Check the Dec and Hex entities against the glyphs that have named entities
            let hexGlyphCheck = hexidecimalEntityCvtDecValidCP.map(HexCvtArr =>
              HexCvtArr.filter(decEncodesValidGlyph)
            );
            let decGlyphCheck = decimalEntityCvtDecValidCP.map(DecCvtArr =>
              DecCvtArr.filter(decEncodesValidGlyph)
            );

            // Check the Dec and Hex Entities against emojis
            let hexEmojiCheck = hexidecimalEntityCvtDecValidCP.map(HexCvtArr =>
              HexCvtArr.filter(decEncodesValidEmoji)
            );
            let decEmojiCheck = decimalEntityCvtDecValidCP.map(DecCvtArr =>
              DecCvtArr.filter(decEncodesValidEmoji)
            );

            if (!null) {
              return;
            }
          }
        }
      },
    };
  }
};
