## no-glyph-only

Using a graphical symbol to convey information can make content difficult to comprehend; assistive technology users may have difficulty determining the meaning of the graphical symbol. If a graphical symbol is used to convey information, provide an alternative using features of the technology or use a different mechanism that can be marked with an alternative to represent the graphical symbol. For example, an image with a text alternative can be used instead of the glyph.

This rule prevents the use of a glyph, svg, or emoji alone, without the appropriate additional attributes. It does not check image elements, since those are already linted for in `require-valid-alt-text`.

### Examples

This rule **forbids** the following:

```hbs
<button>&frac13;</button>
```

```hbs
<button>🇯🇵</button>
```

This rule **allows** the following:

```hbs
<button aria-label="Switch to Japanese"><span aria-hidden="true">🇯🇵</span></button>
```

```hbs
<button><span aria-hidden="true">🇯🇵</span> Switch to Japanese</button>
```

### Migration

(suggest any fast/automated techniques for fixing violations in a large codebase)

* Add information available for assistive technology by using aria-label, aria-labelledby or aria-describedby (as appropriate)
* Add additional text so the glyph/emoji/icon is not the only method of conveying information to the user

### Related Rules

* [require-valid-alt-text](require-valid-alt-text.md)

### References

* [ARIA24: Semantically identifying a font icon with role="img"](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA24)
* [F26: Failure of Success Criterion 1.3.3 due to using a graphical symbol alone to convey information](https://www.w3.org/WAI/WCAG21/Techniques/failures/F26)
