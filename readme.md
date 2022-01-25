| FHIR Extension Helpers |
|---|

## Introduction ##

This is an unofficial set of helper functions to ease working with FHIR Extensions in Javascript and TypeScript.

This library provides for [FHIR R4][r4-spec]:

* getExtension & getExtensions
* setExtension & addExtension
* getExtesion[Value type]Value
* clearExtensions
* hasExtension, hasExtensionAny

**IMPORTANT**
Once things settle in, it will be deployed to the public npm registry

## Example Usage ##
Setting a specific extension value (complex datatype properties/elements)
Note: Will remove any other extensions with this extension URL too.
``` javascript
import exHelpers from './extensions'; // this will be from npm pacakge once published

let sample: fhir4.Coding = { system: 'system', code: 'c', display: 'blah' };
exHelpers.setExtension(sample, { url: 'https://example.org/exturl', valueBoolean: true });
```

Adding an extension (will append to the extensions, not replace existing one(s))
``` javascript
exHelpers.addExtension(sample, { url: 'https://example.org/exturl', valueString: "test" });
```

Retrieving a specific untyped extension value (as first only - no warning if there are multiple values)
``` javascript
let result: fhir4.Extension | undefined = exHelpers.getExtension(sample, 'https://example.org/exturl');
```

Retrieving a specific typed extension value (as first only - no warning if there are multiple values)
``` javascript
let result: string | undefined = exHelpers.getExtensionStringValue(sample, 'https://example.org/exturl');
```

Retrieving the collection of untyped extension values
``` javascript
let result: fhir4.Extension[] | undefined = exHelpers.getExtensions(sample, 'https://example.org/exturl');
```

Removing all extensions with a specific URL
``` javascript
exHelpers.clearExtension(sample, 'https://example.org/exturl');
```

Setting an extension on a primitive property
``` javascript
let patient: fhir4.Patient = { resourceType: 'Patient', birthDate: '1974-12-25' };
exHelpers.setExtension(patient._birthDate, 
    {
        url: 'http://hl7.org/fhir/StructureDefinition/patient-birthTime', 
        valueDateTime: '1974-12-25T14:35:45-05:00'
    },
    () => { return patient._birthDate = {} });
```

## Support ##
TBD - there's not really much here...
For questions and broader discussions, use the FHIR Implementers chat on [Zulip][javascript-zulip].

## Contributing ##
I'm welcoming contributors from the FHIR community!

[javascript-zulip]: https://chat.fhir.org/#narrow/stream/179169-javascript
[r4-spec]: http://www.hl7.org/fhir/r4
