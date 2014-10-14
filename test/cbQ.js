/**
 * Created by jhorlin.dearmas on 10/13/2014.
 */
(function (should, cbQ) {
    describe("Create a promise from a callback and create callback that is backed by a promise", function () {
        it("should create a promise when no callback is specified", function (done) {
            var deferred = cbQ.defer();
            deferred.promise.then(function (result) {
                try {
                    result.should.equal(true);
                    done();
                } catch (err) {
                    done(err);
                }
            });
            process.nextTick(function () {
                deferred.resolve(true);
            });
        });

        it("should create a promise when a callback is specified", function (done) {
            var cb = function(err, result){
                try{
                    should.not.exist(err);
                    result.should.equal(true);
                    done();
                } catch(err) {
                    done(err);
                }
            };
            var deferred = cbQ.defer(cb);
            process.nextTick(function () {
                deferred.resolve(true);
            });
        });

        it("should create a promise when a callback is specified and reject the promise", function (done) {
            var cb = function(err, result){
                try{
                    should.not.exist(result);
                    err.should.equal(true);
                    done();
                } catch(err) {
                    done(err);
                }
            };
            var deferred = cbQ.defer(cb);
            process.nextTick(function () {
                deferred.reject(true);
            });
        });

        it("it should create a callback function used to pass into nodejs cb(err, result) pattern methods", function(done){
           var callback = cbQ.cb();
           callback.promise.then(function(result){
               try{
                   result.should.equal(true);
                   done();
               } catch(err){
                   done(err);
               }
           });
            process.nextTick(function(){
                callback(undefined, true);
            });
        });

    });
}(require('should'), require('../index')))