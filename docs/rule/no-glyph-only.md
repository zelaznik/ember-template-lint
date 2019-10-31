## no-glyph-only
Using a graphical symbol to convey information can make content difficult to comprehend, especially for users with assistive technology. Examples of graphical symbols include an image of a red circle with a line through it, a "smiley" face, or a glyph which represents a check mark, arrow, or other symbol but is not the character with that meaning.

This rule prevents the use of a glyph or emoji alone to convey information.

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
<button aria-label="send an email"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" role="img" focusable="false" aria-hidden="true" data-icon="envelope" data-prefix="fas" id="ember180" class="svg-inline--fa fa-envelope fa-w-16 ember-view"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
</svg></button>
```

```hbs
<button><span aria-hidden="true">🇯🇵</span> Switch to Japanese</button>
```

### Migration

* An image with a text alternative can be used instead of the glyph/emoji
* The glyph/emoji can be hidden with aria-hidden="true" and an appropriate label can be added to the parent element

### References

* [Failure of Success Criterion 1.3.3 due to using a graphical symbol alone to convey information](https://www.w3.org/WAI/WCAG21/Techniques/failures/F26)
* [Using alt attributes on img elements](https://www.w3.org/WAI/WCAG21/Techniques/html/H37)
* [Semantically identifying a font icon with role="img"](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA24)
