'use strict';

import angular from 'angular';
import {expect} from 'chai';
import qConstructor from '../';

describe('angular-q-constructor', () => {

  let $q, $timeout;
  beforeEach(angular.mock.module(qConstructor));
  beforeEach(angular.mock.inject(($injector) => {
    $q = $injector.get('$q');
    $timeout = $injector.get('$timeout');
  }));

  it('can construct fulfilled promises', (done) => {
    $q((resolve, reject) => {
      resolve('foo');
    })
    .then((value) => {
      expect(value).to.equal('foo');
      done();
    });
    $timeout.flush();
  });

  it('can construct rejected promises', (done) => {
    const err = new Error();
    $q((resolve, reject) => {
      reject(err);
    })
    .catch((_err) => {
      expect(_err).to.equal(err);
      done();
    });
    $timeout.flush();
  });

  it('mains the behavior of $q methods', (done) => {
    $q.when('foo')
      .then((value) => {
        expect(value).to.equal('foo');
        done();
      });
    $timeout.flush();
  });

});
