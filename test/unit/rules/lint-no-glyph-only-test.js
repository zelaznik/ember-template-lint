'use strict';

const generateRuleTests = require('../../helpers/rule-test-harness');

generateRuleTests({
  name: 'no-glyph-only',

  config: true,

  good: [
    '<span class="icon icon-star-bg" role="img" aria-label="Favorite"></span>',
    '<button aria-label="like this post">&check;</button>',
    '<a href="email.html" class="icon-double-link"><span class="icon icon-email" role="img" aria-hidden="true"></span>    <span class="icon icon-chevron" role="img" aria-hidden="true"></span>Email</a>',
  ],

  bad: [
    {
      template: '<button>&frac13;</button> ',

      result: {
        moduleId: 'layout.hbs',
        message: 'A glyph cannot be used alone to convey information.',
        line: 1,
        column: 0,
        source: '<button>&frac13;</button>',
      },
    },

    {
      template: '<button>🇯🇵</button>',
      result: {
        moduleId: 'layout.hbs',
        message: 'A glyph cannot be used alone to convey information.',
        line: 1,
        column: 0,
        source: '<button>🇯🇵</button>',
      },
    },
    {
      template: '<button>&#1F609;</button>',
      result: {
        moduleId: 'layout.hbs',
        message: 'A glyph cannot be used alone to convey information.',
        line: 1,
        column: 0,
        source: '<button>&#1F609;</button>',
      },
    },
  ],
});
