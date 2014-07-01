'use strict';

describe('Service: dataFeed', function () {

  // load the service's module
  beforeEach(module('socialjusticeApp'));

  // instantiate service
  var dataFeed;
  beforeEach(inject(function (_dataFeed_) {
    dataFeed = _dataFeed_;
  }));

  it('should do something', function () {
    expect(!!dataFeed).toBe(true);
  });

});
