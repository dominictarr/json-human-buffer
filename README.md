# json-human-buffer

Just like json-buffer but optimized for human readability.

All buffers are encoded as base64 with a `.base64` extension at the end.
If a string already ends in `.base64` or `.`, another period is appended,
and this will removed when decoding, so encoding/decoding is fully two-way.

When streaming, I recommend using `\n\n` (two newlines) as a delimiter.
It's easier to implement a line delimited parser and combine it with
a non-streaming json parser, which has good support in every language.
even in javascript, it's faster to use `string.split('\n\n')` than to
parse streaming json. Using double newlines as a delimiter means you can
pretty print the json, for maximum readability!

``` js
var JSONH = require('json-human-buffer')

var string = JSONH.stringify(object, null, 2) //pretty printed with newlines
var _object = JSONH.parse(string)
```


## License

MIT
