function validatePrettyPrintedJson(json) {
    let data;

    // eslint-disable-next-line no-param-reassign
    json = json.toValue();

    if ((json == null) || (json === '')) {
        return true;
    }

    try {
        data = JSON.parse(json);
    } catch (e) {
        return true;
    }

    if (typeof (data) !== 'object') {
        return true;
    }

    let keyCount = 0;

    const countKeys = (obj) => {
        // eslint-disable-next-line guard-for-in
        for (const key in obj) {
            if (typeof (obj[key]) === 'object') {
                keyCount += 1;
                countKeys(obj[key]);
            } else {
                keyCount += 1;
            }
        }
    };

    countKeys(data);

    const linesCount = json.split('\n').length;

    if (linesCount >= keyCount) {
        return true;
    }
    return 'JSON is not pretty-printed, expecting one key per line.';
}
