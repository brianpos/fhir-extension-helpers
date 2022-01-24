import exHelpers from './extensions';

test('string get/set/clear extension value', () => {
    let sample:fhir4.Coding = { system: 'system', code: 'c', display: 'blah'};
    expect(JSON.stringify(sample)).toBe('{"system":"system","code":"c","display":"blah"}');
    exHelpers.setExtension(sample, { url: 'exturl', valueString: 'test' });
    let result = exHelpers.getExtensionStringValue(sample, 'exturl');
    expect(JSON.stringify(sample)).toBe('{"system":"system","code":"c","display":"blah","extension":[{"url":"exturl","valueString":"test"}]}');
    expect(result).toBe('test');

    exHelpers.setExtension(sample, { url: 'exturl', valueString: 'test2' });
    result = exHelpers.getExtensionStringValue(sample, 'exturl');
    expect(JSON.stringify(sample)).toBe('{"system":"system","code":"c","display":"blah","extension":[{"url":"exturl","valueString":"test2"}]}');
    expect(result).toBe('test2');

    exHelpers.clearExtension(sample, 'exturl');
    expect(JSON.stringify(sample)).toBe('{"system":"system","code":"c","display":"blah"}');
    result = exHelpers.getExtensionStringValue(sample, 'exturl');
    expect(result).toBe(undefined);
})

test('boolean get/set extension value', () => {
    let sample: fhir4.Coding = { system: 'system', code: 'c', display: 'blah' };
    expect(JSON.stringify(sample)).toBe('{"system":"system","code":"c","display":"blah"}');
    exHelpers.setExtension(sample, { url: 'exturl', valueBoolean: true });
    let result = exHelpers.getExtensionBooleanValue(sample, 'exturl');
    expect(JSON.stringify(sample)).toBe('{"system":"system","code":"c","display":"blah","extension":[{"url":"exturl","valueBoolean":true}]}');
    expect(result).toBe(true);

    exHelpers.setExtension(sample, { url: 'exturl', valueBoolean: false });
    result = exHelpers.getExtensionBooleanValue(sample, 'exturl');
    expect(JSON.stringify(sample)).toBe('{"system":"system","code":"c","display":"blah","extension":[{"url":"exturl","valueBoolean":false}]}');
    expect(result).toBe(false);

    exHelpers.clearExtension(sample, 'exturl');
    expect(JSON.stringify(sample)).toBe('{"system":"system","code":"c","display":"blah"}');
    result = exHelpers.getExtensionBooleanValue(sample, 'exturl');
    expect(result).toBe(undefined);
})

// Test multiple values
test('batch get/set/clear extension value', () => {
    let sample:fhir4.Coding = { system: 'system', code: 'c', display: 'blah'};
    expect(JSON.stringify(sample)).toBe('{"system":"system","code":"c","display":"blah"}');
    exHelpers.setExtension(sample, { url: 'exturl', valueString: 'test' });
    exHelpers.addExtension(sample, { url: 'exturl', valueString: 'test2' });
    expect(JSON.stringify(sample)).toBe('{"system":"system","code":"c","display":"blah","extension":[{"url":"exturl","valueString":"test"},{"url":"exturl","valueString":"test2"}]}');
    let result = exHelpers.getExtensionStringValue(sample, 'exturl');
    expect(result).toBe('test');

    let results = exHelpers.getExtensionStringValues(sample, 'exturl');
    expect(results).toStrictEqual(['test','test2']);

    exHelpers.setExtension(sample, { url: 'exturl', valueString: 'test3' });
    result = exHelpers.getExtensionStringValue(sample, 'exturl');
    expect(JSON.stringify(sample)).toBe('{"system":"system","code":"c","display":"blah","extension":[{"url":"exturl","valueString":"test3"}]}');
    expect(result).toBe('test3');

    exHelpers.clearExtension(sample, 'exturl');
    expect(JSON.stringify(sample)).toBe('{"system":"system","code":"c","display":"blah"}');
    result = exHelpers.getExtensionStringValue(sample, 'exturl');
    expect(result).toBe(undefined);
})

