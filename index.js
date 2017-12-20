function namespace (arr, ns) {
    ns = ns || ''
    if (Array.isArray(arr)) return arr.reduce(function (acc, name) {
        acc[name] = ns + '.' + name
        return acc
    }, {})

    return Object.keys(arr).reduce(function (acc, k) {
        acc[k] = namespace(arr[k], ns ? (ns + '.' + k) : k)
        return acc
    }, {})
}

function flatten (tree) {
    return Object.keys(tree).reduce(function (acc, k) {
        return acc.concat(typeof tree[k] === 'string' ?
            tree[k] :
            flatten(tree[k])
        )
    }, [])
}

namespace.flatten = flatten
module.exports = namespace

