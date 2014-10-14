/**
 * Created by jhorlin.dearmas on 10/13/2014.
 */
(function(module, q){
    "use strict";
    module.exports = {
        /**
         * Creates a deferred object that when resolves it will execute the error first callback
         * @param {function} cb
         * @returns {*}
         */
        defer: function (cb) {
            var deferred = q.defer();
            if (cb && typeof cb === "function") {
                deferred.promise.then(function (result) {
                    cb(undefined, result);
                }, function (reason) {
                    cb(reason);
                });
            }
            return deferred;
        },
        /**
         * Creates an error first callback function that resolves into a promise
         * @returns {callBack}
         */
        cb: function () {
            var deferred = q.defer(),
                callBack = function (err, result) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(result);
                    }
                };
            callBack.promise = deferred.promise;
            return callBack;
        }
    };
}(module, require("q")))