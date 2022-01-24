// Helper methods for operating with fhir extensions (R4)
export default {
    addExtension,
    clearExtension,
    getExtension,
    getExtensions,
    getExtensionBooleanValue,
    getExtensionStringValue,
    getExtensionStringValues,
    getExtensionIntegerValue,
    getExtensionMarkdownValue,
    hasExtension,
    hasExtensionAny,
    setExtension,
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
 */
export function setExtension(element: fhir4.Element, value: fhir4.Extension) {
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
 */
export function addExtension(element: fhir4.Element, value: fhir4.Extension) {
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


export function getExtensionStringValue(element: fhir4.Element | undefined, url: string): string | undefined {
    return getExtension(element, url)?.valueString;
}

export function getExtensionStringValues(element: fhir4.Element | undefined, url: string): string[] | undefined {
    return getExtensions(element, url)?.filter((item) => { return !!item.valueString }).map<string>((item) => { return item.valueString ?? ''; });
}

export function getExtensionIntegerValue(element: fhir4.Element | undefined, url: string): number | undefined {
    return getExtension(element, url)?.valueInteger;
}

export function getExtensionBooleanValue(element: fhir4.Element | undefined, url: string): boolean | undefined {
    return getExtension(element, url)?.valueBoolean;
}

export function setExtensionBooleanValue(element: fhir4.Element, url: string, value: boolean) {
    setExtension(element, { url: url, valueBoolean: value });
}

export function getExtensionMarkdownValue(element: fhir4.Element | undefined, url: string): string | undefined {
    if (!element || !element.extension) return undefined;
    var extValues = element.extension.filter((v, i, arr) => {
        if (v.url === url) return true;
        return false;
    });
    if (extValues && extValues.length > 0) return extValues[0].valueMarkdown;
    return undefined;
}

