

function countKeys (obj) {
    // eslint-disable-next-line guard-for-in
    for (const key in obj) {
        if (typeof (obj[key]) === 'object') {
            keyCount += 1;
            countKeys(obj[key]);
        } else {
            keyCount += 1;
        }
    }
}

module.exports = {
    countKeys,
};
