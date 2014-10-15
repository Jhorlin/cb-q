cb-q
===

Use cb-q to handle callbacks as a deferred object when a callback exists or create a deferred object when a callback does not exist.
## install
```
npm install cb-q
```
## Motivation
[Promises](https://github.com/kriskowal/q) is a great pattern but many libraries use [Error-First Callbacks](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/).
Since the promise pattern returns a deferred object and asyncronous functions require a callback and usually return undefined, why can't we do both.

## Usage
Create an async function than handel both callbacks and promises.
``` javascript
var cbQ = require('cb-q');
asyncFunction(foo, cb()){
    var deferred = cbQ.defer(cb);
    //do some async stuff
    process.nextTick(function(){
        //on success
        if(success){
            deferred.resolve("yes it worked")
         } else {
          // on error
            deferred.reject();
         }
    })
    return deferred.promise;
}
```
Creating a callback that I can pass into a method expecting an error-first callback and expose a promise.
``` javascript
var cbQ = require('cb-q');
var callback = cbQ.cb();
callback.promise.then(function(result){
    //handle success
}, function(err){
    //handle error
});
fs.readFile('some-file.txt', callback);
```
If you already have a promise and simply want to execute a callback when the promise is resolve
``` javascript
var cbQ = require('cb-q');
var deferred = q.defer();
var promise = deferred.promise;
deferred.resolve('resolved');
var callback = function(err, result){
    if(err){
        throw(err);
    }
    console.log(result);
}
cbQ.resolve(callback, promise);
fs.readFile('some-file.txt', callback);
```
## Test
```
npm test
```