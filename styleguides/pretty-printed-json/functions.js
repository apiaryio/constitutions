const helpers = require('./helpers');

/*
 Validates if JSON body string is a pretty printed JSON. It naively expects
 at least one line per key in parsed object.

 @targets: Request_Body, Response_Body
 @minim: true
 */
function validatePrettyPrintedJson(json) {
    _.each(json, function(a) {})
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

    helpers.countKeys(data);

    const linesCount = json.split('\n').length;

    if (linesCount >= keyCount) {
        return true;
    }
    return 'JSON is not pretty-printed, expecting one key per line.';
}


module.exports = {
    validatePrettyPrintedJson,
};
