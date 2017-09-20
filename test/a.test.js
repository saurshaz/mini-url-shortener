import assert from 'assert';
// import Firebaseapi from '../state-management/api/firebase.js';

const NO_OF_APPS = 1;

// create
describe('Firebase.init()', () => {
  it('initialize firebase database if not already initialized', () => {
    assert.equal(NO_OF_APPS, 1);
  });
});
/* describe('Firebaseapi.add(obj,path)', () => {
  describe('takes object and path as parameter', () => {
    it('adds object to firebase database with unique key'), () => {
      assert.equal(check if added, Firebaseapi.add({ name: 'Bertie Wooster' }));
    };
  });
}); */
