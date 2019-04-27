const events = require('events');

class IntentEmitter extends events {}

exports.registerEmitter = (eventName, cb) => {
 const emitter = new IntentEmitter(); 
 const callback = cb || ((a, ...others) => console.log(`${eventName} called with: ${a} and ${others}`));

 emitter.on(eventName, callback);

 return emitter;
}

exports.callFnWithEmitter = (fn, eventName, cb) => {
  const emitter = exports.registerEmitter(eventName, cb);

  return fn.call(emitter);
}