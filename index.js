var Bus = require('nanobus')
var inherits = require('inherits')

function namespace (evs) {
    return Object.keys(evs).reduce(function (acc, k) {
        acc[k] = evs[k].reduce(function (_acc, name) {
            _acc[name] = k + '.' + name
            return _acc
        }, {})

        return acc
    }, {})
}

function Topic (evObj, bus) {
    if (!(this instanceof Topic)) return new Topic(evObj, bus)
    Bus.call(this)
    var self = this
    this._listeners = []
    this.parent = bus
    Object.keys(evObj).forEach(function (k) {
        function reEmit (data) {
            self.emit(k, data)
        }
        bus.on(evObj[k], reEmit)
        self._listeners.push([evObj[k], reEmit])
    })
}
inherits(Topic, Bus)

Topic.prototype.close = function () {
    var self = this
    this._listeners.forEach(function (pair) {
        self.parent.removeListener(pair[0], pair[1])
    })
    this.removeAllListeners()
}

function _topic (evs, bus) {
    if (!bus) return function (_bus) {
        return _topic(evs, _bus)
    }
    return Topic(evs, bus)
}

module.exports = {
    Topic: _topic,
    namespace: namespace
}


