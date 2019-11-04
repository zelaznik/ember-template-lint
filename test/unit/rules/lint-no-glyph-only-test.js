'use strict';

const generateRuleTests = require('../../helpers/rule-test-harness');

generateRuleTests({
  // Change to dasherized-rule-name
  name: 'no-glyph-only',

  config: true,

  // Example: No EOL Space
  good: ['passingTest00', 'passing Test01'],

  bad: [
    {
      template: 'FailingTest00 ',

      result: {
        moduleId: 'layout.hbs',
        message: 'Reason FailingTest00 failed -- EOL Space',
        line: 1,
        column: 13,
        source: 'FailingTest00 ',
      },
    },

    {
      template: 'FailingTest01 \n',
      result: {
        moduleId: 'layout.hbs',
        message: 'Reason FailingTest01 \n failed -- EOL Space',
        line: 1,
        column: 13,
        source: 'FailingTest01 \n',
      },
    },
  ],
});
