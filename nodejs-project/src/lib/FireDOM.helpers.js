const arePropsEqual = function arePropsEqual(props1, props2) {
    // check if both arguments are objects
    if (typeof props1 !== "object" || typeof props2 !== "object") {
        return false;
    }

    return compareObjects(props1, props2);
}

const getValueType = function (v1) {
    if (v1 === undefined) {
        return undefined
    }

    if (v1 === null) {
        return null
    }


    if (typeof v1 === "object") {
        if (v1 instanceof String) {
            return "string"
        }
        if (v1 instanceof Number) {
            return "number"
        }
        if (Array.isArray(v1)) {
            return "array";
        }
        return "object";
    }

    return typeof v1;
}

const compareObjects = function (obj1, obj2) {
    let valueType1, valueType2,
        obj1Keys = Object.keys(obj1),
        obj2keys = Object.keys(obj2);

    // if they have diffrent number of keys - they are diffrent
    if (obj1Keys.length !== obj2keys.length) {
        return false;
    }

    for (let prop of obj1Keys) {
        // if second object does't contain given property name - they are diffrent
        if (!obj2.hasOwnProperty(prop)) {
            return false;
        }

        valueType1 = getValueType(obj1[prop]);
        valueType2 = getValueType(obj2[prop]);

        if (valueType1 !== valueType2) {
            return false
        }

        switch (valueType1) {
            case "array": {
                if (!compareArrays(obj1[prop], obj2[prop])) {
                    return false
                }
                break;
            }
            case "object": {
                if (!compareObjects(obj1[prop], obj2[prop])) {
                    return false;
                }
                break;
            }

            case "string": {
                if (!compareStrings(obj1[prop], obj2[prop])) {
                    return false;
                }
                break;
            }

            default: {
                if (!compareValues(obj1[prop], obj2[prop])) {
                    return false;
                }
                break;
            }
        }
    }
    return true;
}

const compareStrings = function (s1, s2) {
    if (s1.length !== s2.length) {
        return false;
    }

    return s1 === s2;
}

const compareValues = function (val1, val2) {
    return val1 === val2;
}

const compareArrays = function (arr1, arr2) {
    let areBothArrays = Array.isArray(arr1) && Array.isArray(arr2),
        compareResult = true,
        areSameLength = (arr1.length === arr2.length);

    if (!areBothArrays || !areSameLength) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (getValueType(arr1[i]) !== getValueType(arr2[i])) {
            return false
        }
        compareResult = typeof arr1[i] === "object" ? compareObjects(arr1[i], arr2[i]) : compareValues(arr1[i], arr2[i])

        if (!compareResult) {
            return false
        }
    }

    return true;
}

export { arePropsEqual }