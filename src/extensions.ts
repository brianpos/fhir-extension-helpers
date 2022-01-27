// Helper methods for operating with fhir extensions (R4)
export default {
    addExtension,
    clearExtension,
    getExtension,
    getExtensions,
    hasExtension,
    hasExtensionAny,
    setExtension,

    getExtensionStringValue,
    getExtensionStringValues,
    setExtensionStringValue,
    addExtensionStringValue,

    getExtensionIntegerValue,
    setExtensionIntegerValue,

    getExtensionBooleanValue,
    setExtensionBooleanValue,

    getExtensionMarkdownValue,
    setExtensionMarkdownValue,

    getExtensionDecimalValue,
    setExtensionDecimalValue,

    getExtensionExpressionValue,
    getExtensionExpressionValues,

    getExtensionCodingValue,
    getExtensionCodingValues,

    getExtensionUrlValue,
    getExtensionUrlValues,
    setExtensionUrlValue,
    addExtensionUrlValue,

    getExtensionCodeValue,
    getExtensionCodeValues,
    setExtensionCodeValue,
    addExtensionCodeValue,

    getExtensionCodeableConceptValue,
    getExtensionCodeableConceptValues,

    getExtensionDurationValue,
    getExtensionDurationValues,

    getExtensionQuantityValue,
    getExtensionQuantityValues,

    getExtensionUriValue,
    getExtensionUriValues,
    setExtensionUriValue,
    addExtensionUriValue,

    getExtensionCanonicalValue,
    getExtensionCanonicalValues,
    setExtensionCanonicalValue,
    addExtensionCanonicalValue,

    getExtensionReferenceValue,
    getExtensionReferenceValues,

}

/**
 * get the first extension value (if it exists)
 * (If you want to get a set of extensions, use the getExtensions function)
 * @param element - The fhir property/resource/backbone to read the extensions from
 * @param url - The Extension URL to read
 */
export function getExtension(element: fhir4.Element | undefined, url: string): fhir4.Extension | undefined {
    if (!element || !element.extension) return undefined;
    var extValues = element.extension.filter((v, i, arr) => {
        if (v.url === url) return true;
        return false;
    });
    if (extValues && extValues.length > 0) return extValues[0];
    return undefined;
}

/**
 * get the set of extension values, or undefined if none exist
 * (If you expect only a singular extension value, use the getExtension function)
 * @param element - The fhir property/resource/backbone to read the extensions from
 * @param url - The Extension URL to read
 */
export function getExtensions(element: fhir4.Element | undefined, url: string): fhir4.Extension[] | undefined {
    if (!element || !element.extension) return undefined;
    var extValues = element.extension.filter((v, i, arr) => {
        if (v.url === url) return true;
        return false;
    });
    if (extValues && extValues.length > 0) return extValues;
    return undefined;
}

/** Set an extension value for an element (using the url in the extension value, and remove any other instances of the extension if they exist)
 * (If you want to remove the extension with this url, use ClearExtension(url))
 * @param element - The fhir resource/element to set the extension on
 * @param value - The new value for the extension to be set
 * @param createExtensionElement - Function to create the extension element if it doesn't already exist (important for primitive extensions that normally aren't there)
 */
export function setExtension(element: fhir4.Element | undefined, value: fhir4.Extension, createExtensionElement?: () => fhir4.Element) {
    if (!element) {
        if (!createExtensionElement) {
            throw "Attempt to set an Extension without a createExtension method";
        }
        element = createExtensionElement();
        if (!element) {
            throw "createExtension method did not create a new element";
        }
    }
    if (!element.extension) element.extension = [];
    var extValues = element.extension.filter((v, i, arr) => {
        if (v.url === value.url) return true;
        return false;
    });
    if (extValues && extValues.length > 0) {
        element.extension[element.extension.indexOf(extValues[0])] = value;
        // remove down any other values
        for (var index = 1; index < extValues.length; index++) {
            element.extension.splice(element.extension.indexOf(extValues[index]), 1);
        }
    } else {
        // Add in the extension with thie value
        element.extension.push(value);
    }
}

/**
 * Add an extension value, if an extension with this value already exists, it will remain.
 * @param element - The fhir resource/element to add the extension to
 * @param value - The new value for the extension to be added
 * @param createExtensionElement - Function to create the extension element if it doesn't already exist (important for primitive extensions that normally aren't there)
 */
export function addExtension(element: fhir4.Element | undefined, value: fhir4.Extension, createExtensionElement?: () => fhir4.Element) {
    if (!element) {
        if (!createExtensionElement) {
            throw "Attempt to set an Extension without a createExtension method";
        }
        element = createExtensionElement();
        if (!element) {
            throw "createExtension method did not create a new element";
        }
    }
    if (!element.extension) element.extension = [];
    // Add in the extension with this value
    element.extension.push(value);
}


/**
 * remove all the extensions from this element that have the provided extension URL
 * (If there are no extensions left, then the extension array will be removed from the element)
 * @param element - The fhir resource/element to clear the extension from
 * @param url - The Extension URL to clear
 */
export function clearExtension(element: fhir4.Element, url: string) {
    if (!element.extension) return;
    var extValues = element.extension.filter((v, i, arr) => {
        if (v.url === url) return true;
        return false;
    });
    if (extValues && extValues.length > 0) {
        // remove down any other values
        for (var item of extValues) {
            element.extension.splice(element.extension.indexOf(item), 1);
        }
    }
    if (element.extension.length === 0) {
        delete element.extension;
    }
}

export function hasExtension(element: fhir4.Element | undefined, url: string) {
    if (!element || !element.extension) return false;
    var extValues = element.extension.filter((v, i, arr) => {
        if (v.url === url) return true;
        return false;
    });
    if (extValues && extValues.length > 0) return true;
    return false;
}

export function hasExtensionAny(element: fhir4.Element | undefined, urls: string[]) {
    if (!element || !element.extension) return false;
    var extValues = element.extension.filter((v, i, arr) => {
        for (const url of urls) {
            if (v.url === url) return true;
        }
        return false;
    });
    if (extValues && extValues.length > 0) return true;
    return false;
}

// --------------------------------------------------------------------------
// String
export function getExtensionStringValue(element: fhir4.Element | undefined, url: string): string | undefined {
    return getExtension(element, url)?.valueString;
}

export function getExtensionStringValues(element: fhir4.Element | undefined, url: string): string[] | undefined {
    return getExtensions(element, url)?.filter((item) => { return !!item.valueString })
        .map<string>((item) => { return item.valueString ?? ''; });
}

export function setExtensionStringValue(element: fhir4.Element, url: string, value: string, createExtensionElement?: () => fhir4.Element) {
    setExtension(element, { url: url, valueString: value }, createExtensionElement);
}

export function addExtensionStringValue(element: fhir4.Element, url: string, value: string, createExtensionElement?: () => fhir4.Element) {
    addExtension(element, { url: url, valueString: value }, createExtensionElement);
}

// --------------------------------------------------------------------------
// Integer
export function getExtensionIntegerValue(element: fhir4.Element | undefined, url: string): number | undefined {
    return getExtension(element, url)?.valueInteger;
}

export function setExtensionIntegerValue(element: fhir4.Element, url: string, value: number, createExtensionElement?: () => fhir4.Element) {
    setExtension(element, { url: url, valueInteger: value }, createExtensionElement);
}

// --------------------------------------------------------------------------
// Boolean
export function getExtensionBooleanValue(element: fhir4.Element | undefined, url: string): boolean | undefined {
    return getExtension(element, url)?.valueBoolean;
}

export function setExtensionBooleanValue(element: fhir4.Element, url: string, value: boolean, createExtensionElement?: () => fhir4.Element) {
    setExtension(element, { url: url, valueBoolean: value }, createExtensionElement);
}

// --------------------------------------------------------------------------
// Markdown
export function getExtensionMarkdownValue(element: fhir4.Element | undefined, url: string): string | undefined {
    return getExtension(element, url)?.valueMarkdown;
}

export function setExtensionMarkdownValue(element: fhir4.Element, url: string, value: string, createExtensionElement?: () => fhir4.Element) {
    setExtension(element, { url: url, valueMarkdown: value }, createExtensionElement);
}

// --------------------------------------------------------------------------
// Decimal
export function getExtensionDecimalValue(element: fhir4.Element | undefined, url: string): number | undefined {
    return getExtension(element, url)?.valueDecimal;
}

export function setExtensionDecimalValue(element: fhir4.Element, url: string, value: number, createExtensionElement?: () => fhir4.Element) {
    setExtension(element, { url: url, valueDecimal: value }, createExtensionElement);
}

// --------------------------------------------------------------------------
// Expression
export function getExtensionExpressionValue(element: fhir4.Element | undefined, url: string): fhir4.Expression | undefined {
    return getExtension(element, url)?.valueExpression;
}

export function getExtensionExpressionValues(element: fhir4.Element | undefined, url: string): fhir4.Expression[] | undefined {
    return getExtensions(element, url)?.filter((item) => { return !!item.valueExpression })
        .map<fhir4.Expression | undefined>((item) => { return item.valueExpression; })
        .filter<fhir4.Expression>((input): input is fhir4.Expression => true);
}

// --------------------------------------------------------------------------
// Coding
export function getExtensionCodingValue(element: fhir4.Element | undefined, url: string): fhir4.Coding | undefined {
    return getExtension(element, url)?.valueCoding;
}

export function getExtensionCodingValues(element: fhir4.Element | undefined, url: string): fhir4.Coding[] | undefined {
    return getExtensions(element, url)?.filter((item) => { return item.valueCoding !== undefined })
        .map<fhir4.Coding | undefined>((item) => { return item.valueCoding; })
        .filter<fhir4.Coding>((input): input is fhir4.Coding => true);
}

// --------------------------------------------------------------------------
// Url
export function getExtensionUrlValue(element: fhir4.Element | undefined, url: string): string | undefined {
    return getExtension(element, url)?.valueUrl;
}

export function getExtensionUrlValues(element: fhir4.Element | undefined, url: string): string[] | undefined {
    return getExtensions(element, url)?.filter((item) => { return !!item.valueUrl })
        .map<string>((item) => { return item.valueUrl ?? ''; });
}

export function setExtensionUrlValue(element: fhir4.Element, url: string, value: string, createExtensionElement?: () => fhir4.Element) {
    setExtension(element, { url: url, valueUrl: value }, createExtensionElement);
}

export function addExtensionUrlValue(element: fhir4.Element, url: string, value: string, createExtensionElement?: () => fhir4.Element) {
    addExtension(element, { url: url, valueUrl: value }, createExtensionElement);
}

// --------------------------------------------------------------------------
// Code
export function getExtensionCodeValue(element: fhir4.Element | undefined, url: string): string | undefined {
    return getExtension(element, url)?.valueCode;
}

export function getExtensionCodeValues(element: fhir4.Element | undefined, url: string): string[] | undefined {
    return getExtensions(element, url)?.filter((item) => { return !!item.valueCode })
        .map<string>((item) => { return item.valueCode ?? ''; });
}

export function setExtensionCodeValue(element: fhir4.Element, url: string, value: string, createExtensionElement?: () => fhir4.Element) {
    setExtension(element, { url: url, valueCode: value }, createExtensionElement);
}

export function addExtensionCodeValue(element: fhir4.Element, url: string, value: string, createExtensionElement?: () => fhir4.Element) {
    addExtension(element, { url: url, valueCode: value }, createExtensionElement);
}

// --------------------------------------------------------------------------
// CodeableConcept
export function getExtensionCodeableConceptValue(element: fhir4.Element | undefined, url: string): fhir4.CodeableConcept | undefined {
    return getExtension(element, url)?.valueCodeableConcept;
}

export function getExtensionCodeableConceptValues(element: fhir4.Element | undefined, url: string): fhir4.CodeableConcept[] | undefined {
    return getExtensions(element, url)?.filter((item) => { return item.valueCodeableConcept !== undefined })
        .map<fhir4.CodeableConcept | undefined>((item) => { return item.valueCodeableConcept; })
        .filter<fhir4.CodeableConcept>((input): input is fhir4.CodeableConcept => true);
}

// --------------------------------------------------------------------------
// Duration
export function getExtensionDurationValue(element: fhir4.Element | undefined, url: string): fhir4.Duration | undefined {
    return getExtension(element, url)?.valueDuration;
}

export function getExtensionDurationValues(element: fhir4.Element | undefined, url: string): fhir4.Duration[] | undefined {
    return getExtensions(element, url)?.filter((item) => { return item.valueDuration !== undefined })
        .map<fhir4.Duration | undefined>((item) => { return item.valueDuration; })
        .filter<fhir4.Duration>((input): input is fhir4.Duration => true);
}

// --------------------------------------------------------------------------
// Quantity
export function getExtensionQuantityValue(element: fhir4.Element | undefined, url: string): fhir4.Quantity | undefined {
    return getExtension(element, url)?.valueQuantity;
}

export function getExtensionQuantityValues(element: fhir4.Element | undefined, url: string): fhir4.Quantity[] | undefined {
    return getExtensions(element, url)?.filter((item) => { return item.valueQuantity !== undefined })
        .map<fhir4.Quantity | undefined>((item) => { return item.valueQuantity; })
        .filter<fhir4.Quantity>((input): input is fhir4.Quantity => true);
}

// --------------------------------------------------------------------------
// Uri
export function getExtensionUriValue(element: fhir4.Element | undefined, url: string): string | undefined {
    return getExtension(element, url)?.valueUri;
}

export function getExtensionUriValues(element: fhir4.Element | undefined, url: string): string[] | undefined {
    return getExtensions(element, url)?.filter((item) => { return item.valueUri !== undefined })
        .map<string | undefined>((item) => { return item.valueUri; })
        .filter<string>((input): input is string => true);
}

export function setExtensionUriValue(element: fhir4.Element, url: string, value: string, createExtensionElement?: () => fhir4.Element) {
    setExtension(element, { url: url, valueUri: value }, createExtensionElement);
}

export function addExtensionUriValue(element: fhir4.Element, url: string, value: string, createExtensionElement?: () => fhir4.Element) {
    addExtension(element, { url: url, valueUri: value }, createExtensionElement);
}

// --------------------------------------------------------------------------
// Canonical
export function getExtensionCanonicalValue(element: fhir4.Element | undefined, url: string): string | undefined {
    return getExtension(element, url)?.valueCanonical;
}

export function getExtensionCanonicalValues(element: fhir4.Element | undefined, url: string): string[] | undefined {
    return getExtensions(element, url)?.filter((item) => { return item.valueCanonical !== undefined })
        .map<string | undefined>((item) => { return item.valueCanonical; })
        .filter<string>((input): input is string => true);
}

export function setExtensionCanonicalValue(element: fhir4.Element, url: string, value: string, createExtensionElement?: () => fhir4.Element) {
    setExtension(element, { url: url, valueCanonical: value }, createExtensionElement);
}

export function addExtensionCanonicalValue(element: fhir4.Element, url: string, value: string, createExtensionElement?: () => fhir4.Element) {
    addExtension(element, { url: url, valueCanonical: value }, createExtensionElement);
}

// --------------------------------------------------------------------------
// Reference
export function getExtensionReferenceValue(element: fhir4.Element | undefined, url: string): fhir4.Reference | undefined {
    return getExtension(element, url)?.valueReference;
}

export function getExtensionReferenceValues(element: fhir4.Element | undefined, url: string): fhir4.Reference[] | undefined {
    return getExtensions(element, url)?.filter((item) => { return item.valueReference !== undefined })
        .map<fhir4.Reference | undefined>((item) => { return item.valueReference; })
        .filter<fhir4.Reference>((input): input is fhir4.Reference => true);
}

// --------------------------------------------------------------------------
