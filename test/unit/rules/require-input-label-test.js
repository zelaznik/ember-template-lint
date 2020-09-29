'use strict';

const {
  ERROR_MESSAGE,
  ERROR_MESSAGE_MULTIPLE_LABEL,
} = require('../../../lib/rules/require-input-label');
const generateRuleTests = require('../../helpers/rule-test-harness');

generateRuleTests({
  name: 'require-input-label',

  config: true,

  good: [
    '<label>LabelText<input /></label>',
    '<label><input />LabelText</label>',
    '<label>LabelText<Input /></label>',
    '<label><Input />LabelText</label>',
    '<label>Label Text<div><input /></div></label>', // technically okay, hopefully no one does this though
    '<input id="probablyHasLabel" />', // it's likely to have an associated label if it has an id attribute
    '<input aria-label={{labelText}} />',
    '<input aria-labelledby="someIdValue" />',
    '<div></div>',
    '<input ...attributes/>', // we are unable to correctly determine if this has a label or not, so we have to allow it
    '<Input ...attributes />',
    '<Input id="foo" />',
    '{{input id="foo"}}',
    '<label>Text here<Input /></label>',
    '<label>Text here {{input}}</label>',
    '<input id="label-input" ...attributes>',

    // Hidden inputs are allowed.
    '<input type="hidden"/>',
    '<Input type="hidden" />',
    '{{input type="hidden"}}',

    // Same logic applies to textareas
    '<label>LabelText<textarea /></label>',
    '<label><textarea />LabelText</label>',
    '<label>LabelText<Textarea /></label>',
    '<label><Textarea />LabelText</label>',
    '<label>Label Text<div><textarea /></div></label>', // technically okay, hopefully no one does this though
    '<textarea id="probablyHasLabel" />', // it's likely to have an associated label if it has an id attribute
    '<textarea aria-label={{labelText}} />',
    '<textarea aria-labelledby="someIdValue" />',
    '<textarea ...attributes />', // we are unable to correctly determine if this has a label or not, so we have to allow it
    '<Textarea ...attributes />',
    '<Textarea id="foo" />',
    '{{textarea id="foo"}}',
    '<label>Text here<Textarea /></label>',
    '<label>Text here {{textarea}}</label>',
    '<textarea id="label-textarea" ...attributes />',

    // Same logic applies to select options
    '<label>LabelText<select><option value="volvo">Volvo</option></select></label>',
    '<label><select><option value="volvo">Volvo</option></select>LabelText</label>',
    '<label>Label Text<div><select><option value="volvo">Volvo</option></select></div></label>', // technically okay, hopefully no one does this though
    '<select id="probablyHasLabel"><option value="volvo">Volvo</option></select>', // it's likely to have an associated label if it has an id attribute
    '<select aria-label={{this.labelText}}><option value="volvo">Volvo</option></select>',
    '<select aria-labelledby="someIdValue"><option value="volvo">Volvo</option></select>',
    '<select ...attributes><option value="volvo">Volvo</option></select>', // we are unable to correctly determine if this has a label or not, so we have to allow it
    '<select id="label-select" ...attributes><option value="volvo">Volvo</option></select>',
  ],

  bad: [
    {
      template: '<div><input /></div>',
      result: {
        message: `input ${ERROR_MESSAGE}`,
        line: 1,
        column: 5,
        source: '<input />',
      },
    },
    {
      template: '<input />',
      result: {
        message: `input ${ERROR_MESSAGE}`,
        line: 1,
        column: 0,
        source: '<input />',
      },
    },
    {
      template: '<input title="some title value" />',
      result: {
        message: `input ${ERROR_MESSAGE}`,
        line: 1,
        column: 0,
        source: '<input title="some title value" />',
      },
    },
    {
      template: '<label><input></label>',
      result: {
        message: `input ${ERROR_MESSAGE}`,
        line: 1,
        column: 7,
        source: '<input>',
      },
    },
    {
      template: '<div>{{input}}</div>',
      result: {
        message: `input ${ERROR_MESSAGE}`,
        line: 1,
        column: 5,
        source: '{{input}}',
      },
    },
    {
      template: '<Input/>',
      result: {
        message: `Input ${ERROR_MESSAGE}`,
        line: 1,
        column: 0,
        source: '<Input/>',
      },
    },
    {
      template: '<input aria-label="first label" aria-labelledby="second label">',
      result: {
        message: `input ${ERROR_MESSAGE_MULTIPLE_LABEL}`,
        line: 1,
        column: 0,
        source: '<input aria-label="first label" aria-labelledby="second label">',
      },
    },
    {
      template: '<input id="label-input" aria-label="second label">',
      result: {
        message: `input ${ERROR_MESSAGE_MULTIPLE_LABEL}`,
        line: 1,
        column: 0,
        source: '<input id="label-input" aria-label="second label">',
      },
    },
    {
      template: '<label>Input label<input aria-label="Custom label"></label>',
      result: {
        message: `input ${ERROR_MESSAGE_MULTIPLE_LABEL}`,
        line: 1,
        column: 18,
        source: '<input aria-label="Custom label">',
      },
    },
    {
      template: '{{input type="button"}}',
      result: {
        message: `input ${ERROR_MESSAGE}`,
        line: 1,
        column: 0,
        source: '{{input type="button"}}',
      },
    },
    {
      template: '{{input type=myType}}',
      result: {
        message: `input ${ERROR_MESSAGE}`,
        line: 1,
        column: 0,
        source: '{{input type=myType}}',
      },
    },
    {
      template: '<input type="button"/>',
      result: {
        message: `input ${ERROR_MESSAGE}`,
        line: 1,
        column: 0,
        source: '<input type="button"/>',
      },
    },
    {
      template: '<input type={{myType}}/>',
      result: {
        message: `input ${ERROR_MESSAGE}`,
        line: 1,
        column: 0,
        source: '<input type={{myType}}/>',
      },
    },
    {
      template: '<Input type="button"/>',
      result: {
        message: `Input ${ERROR_MESSAGE}`,
        line: 1,
        column: 0,
        source: '<Input type="button"/>',
      },
    },
    {
      template: '<Input type={{myType}}/>',
      result: {
        message: `Input ${ERROR_MESSAGE}`,
        line: 1,
        column: 0,
        source: '<Input type={{myType}}/>',
      },
    },
    {
      template: '<div><textarea /></div>',
      result: {
        message: `textarea ${ERROR_MESSAGE}`,
        line: 1,
        column: 5,
        source: '<textarea />',
      },
    },
    {
      template: '<textarea />',
      result: {
        message: `textarea ${ERROR_MESSAGE}`,
        line: 1,
        column: 0,
        source: '<textarea />',
      },
    },
    {
      template: '<textarea title="some title value" />',
      result: {
        message: `textarea ${ERROR_MESSAGE}`,
        line: 1,
        column: 0,
        source: '<textarea title="some title value" />',
      },
    },
    {
      template: '<label><textarea /></label>',
      result: {
        message: `textarea ${ERROR_MESSAGE}`,
        line: 1,
        column: 7,
        source: '<textarea />',
      },
    },
    {
      template: '<div>{{textarea}}</div>',
      result: {
        message: `textarea ${ERROR_MESSAGE}`,
        line: 1,
        column: 5,
        source: '{{textarea}}',
      },
    },
    {
      template: '<Textarea/>',
      result: {
        message: `Textarea ${ERROR_MESSAGE}`,
        line: 1,
        column: 0,
        source: '<Textarea/>',
      },
    },
    {
      template: '<textarea aria-label="first label" aria-labelledby="second label" />',
      result: {
        message: `textarea ${ERROR_MESSAGE_MULTIPLE_LABEL}`,
        line: 1,
        column: 0,
        source: '<textarea aria-label="first label" aria-labelledby="second label" />',
      },
    },
    {
      template: '<textarea id="label-textarea" aria-label="second label" />',
      result: {
        message: `textarea ${ERROR_MESSAGE_MULTIPLE_LABEL}`,
        line: 1,
        column: 0,
        source: '<textarea id="label-textarea" aria-label="second label" />',
      },
    },
    {
      template: '<label>Textarea label<textarea aria-label="Custom label" /></label>',
      result: {
        message: `textarea ${ERROR_MESSAGE_MULTIPLE_LABEL}`,
        line: 1,
        column: 21,
        source: '<textarea aria-label="Custom label" />',
      },
    },
    {
      template: '<div><select></select></div>',
      result: {
        message: `select ${ERROR_MESSAGE}`,
        line: 1,
        column: 5,
        source: '<select></select>',
      },
    },
    {
      template: '<select></select>',
      result: {
        message: `select ${ERROR_MESSAGE}`,
        line: 1,
        column: 0,
        source: '<select></select>',
      },
    },
    {
      template: '<select title="some title value"></select>',
      result: {
        message: `select ${ERROR_MESSAGE}`,
        line: 1,
        column: 0,
        source: '<select title="some title value"></select>',
      },
    },
    {
      template: '<label><select></select></label>',
      result: {
        message: `select ${ERROR_MESSAGE}`,
        line: 1,
        column: 7,
        source: '<select></select>',
      },
    },
    {
      template: '<select aria-label="first label" aria-labelledby="second label"></select>',
      result: {
        message: `select ${ERROR_MESSAGE_MULTIPLE_LABEL}`,
        line: 1,
        column: 0,
        source: '<select aria-label="first label" aria-labelledby="second label"></select>',
      },
    },
    {
      template: '<select id="label-textarea" aria-label="second label"></select>',
      result: {
        message: `select ${ERROR_MESSAGE_MULTIPLE_LABEL}`,
        line: 1,
        column: 0,
        source: '<select id="label-textarea" aria-label="second label"></select>',
      },
    },
    {
      template: '<label>Textarea label<select aria-label="Custom label"></select></label>',
      result: {
        message: `select ${ERROR_MESSAGE_MULTIPLE_LABEL}`,
        line: 1,
        column: 21,
        source: '<select aria-label="Custom label"></select>',
      },
    },
  ],
});
