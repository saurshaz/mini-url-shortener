import assert from 'assert';
import * as service from '../../src/server/service/index';
import '../init';

describe('links-API', () => {
  describe('CRUD functions', () => {
    beforeEach((done) => {

    });

    afterEach((done) => {

    });

    after((done) => {

    });

    it('should create record in database upon calling createEntity()', () => {
      const data = {
        ID: 333,
        CityCode: 'GA',
        Image_Url: 'catphoto.jpg'
      };
      const result = service.create(data);
      return result
        .then((rslt) => {
          assert.equal(rslt.message, 'SUCCESS');
          assert.equal(rslt.error, false);
          assert.equal(rslt.errObj, null);
        })
        .catch((err) => {
          console.error(err);
          assert.fail(err);
        });
    });
    // INSERT INTO `City_Images` (`ID`,`CityCode`,`Image_Url`) VALUES (333,'GA','catphoto.jpg');
    // DELETE FROM `City_Images` WHERE `ID` = 333
    it('should return records based on the criteria upon callint readEntity()', () => {
      const criteria = {
        ID: 334
      };
      const result = service.retrieve(criteria);
      return result
        .then((rslt) => {
          assert.equal(rslt.message, 'SUCCESS');
          assert.equal(rslt.error, false);
          assert.equal(rslt.errObj, null);
        }).catch((err) => {
          assert.fail(err);
        });
    });

    it('should update records in the database based on the criteria upon calling updateEntity()', () => {
      const data = {
        ID: 334,
        CityCode: 'DL',
        Image_Url: 'dogphoto.jpg'
      };
      const criteria = {
        ID: 334
      };
      const result = service.updateEntity('City_Images', criteria, data);
      return result
        .then((rslt) => {
          assert.equal(rslt.message, 'SUCCESS');
          assert.equal(rslt.error, false);
          assert.equal(rslt.errObj, null);
        })
        .catch((err) => {
          assert.fail(err);
        });
    });

    it('should delete records in the database based on the criteria upon calling deleteEntity()', () => {
      const criteria = {
        ID: 334
      };
      const result = service.deleteEntity('City_Images', criteria);
      return result
        .then((rslt) => {
          assert.equal(rslt.message, 'SUCCESS');
          assert.equal(rslt.error, false);
          assert.equal(rslt.errObj, null);
        })
        .catch((err) => {
          console.log(err);
          assert.fail(err);
        });
    });
  });
});
