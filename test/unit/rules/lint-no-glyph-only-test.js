'use strict';

const generateRuleTests = require('../../helpers/rule-test-harness');

generateRuleTests({

  name: 'no-glyph-only',
  config: true,

  // Summary: 
  // A TextNode with a glyph/emoji must provide adequate context for AT.
  // At a minimum, one of the following criteria must be met:
  // -- The glyph's TextNode also contains other text content (ideally, it is descriptive/meaningful)
  // -- The glyph's ElementNode contains appropriately defined aria-related attributes

  good: [

    // ElementNodes without TextNode children -- skip
    // '<div></div>',
    // '<div><p></p></div>',


    // // Surrounding glyph with text content provides adequate context for the glyph,
    // // even when the element is lacking meaningful aria-related attribute definitions
    // '<div>Hamster emoji -- &#128057; -- as a dec-encoded HTML entity</div>',
    // '<div>Hamster emoji -- &#x1F439; -- as a hex-encoded HTML entity</div>',

    // // Multiple TextNode children
    // '<div>&#128057;</div>',
    // '<div>&#x1F439;</div>',
    // '<div>&frac13;</div>',
    '<div>- &#128057; -- &#x1F439; -- &frac13; --&#8531; -- &#x2153; -</div>'

    // Based on common-a11y-failures app
    // '<button aria-label="Purchase a hamster"><FaIcon @icon="envelope" /></button>'
    // '<svg></svg>'

  ],

  bad: [
    {
      template: '<div>&#128057;</div>',
      result: {
        moduleId: 'layout.hbs',
        message: 'Error ',
        line: 1,
        column: 0,
        source: '<div>&#128057;</div>',
      },
    },

    // {
    //   template: 'FailingTest01 \n',
    //   result: {
    //     moduleId: 'layout.hbs',
    //     message: 'Reason FailingTest01 \n failed -- EOL Space',
    //     line: 1,
    //     column: 13,
    //     source: 'FailingTest01 \n',
    //   },
    // },
  ],
});
