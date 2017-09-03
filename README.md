# event utils

Event namespacing and stuff


## example

```js
var Evs = require('../')
var namespace = Evs.namespace
var Topic = Evs.Topic
var Bus = require('nanobus')

var events = namespace({
    foo: ['a', 'b', 'c'],
    bar: ['a', 'b', 'c']
})

console.log(events)
// { foo: { a: 'foo.a', b: 'foo.b', c: 'foo.c' },
//       bar: { a: 'bar.a', b: 'bar.b', c: 'bar.c' } }

var bus = Bus()
var topic = Topic(events.foo, bus)

bus.on('*', console.log.bind(console, 'bus'))
topic.on('*', console.log.bind(console, 'topic'))

bus.emit(events.foo.a, 'hello')
// topic a hello
// bus foo.a hello

bus.emit(events.bar.a, 'wooo')
// bus bar.a wooo

bus.emit(events.foo.b, 'here')
// topic b here
// bus foo.b here

topic.close()
bus.emit(events.foo.a, 'should be closed')
// bus foo.a should be closed
```

