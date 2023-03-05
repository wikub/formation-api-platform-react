const cache = {};

function set(key, data) {
    cache[key] = {
        data: data,
        cacheAt: Date.now(),
    };
}

function get(key) {
    return new Promise((resolve) => {
        resolve(
            cache[key] && cache[key].cacheAt + 15 * 60 * 1000 > Date.now() 
            ? cache[key].data 
            : null
            );
    })

}

function invalidate(key) {
    delete cache[key];
}

export default {
    set,
    get,
    invalidate
}