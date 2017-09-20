import {encode} from 'jwt-simple';
import mongoskin from 'mongoskin';

const db = mongoskin.db(process.env.DB_URI);
const entity = 'short-links';

export const create = data => new Promise((resolve, reject) => {
  db.collection(entity).insert(data, (err, result) => {
    if (!err) {
      resolve({
        message: 'SUCCESS',
        response: result,
        error: false,
        errorObj: null
      });
    } else {
      reject({
        message: 'FAILED',
        response: null,
        error: true,
        errorObj: err
      });
    }
  });
});

export const retrieve = (criteria, options) => new Promise((resolve, reject) => {
  db.collection(entity).findOne(criteria, options, (err, result) => {
    if (!err) {
      resolve({
        message: 'SUCCESS',
        response: result,
        error: false,
        errorObj: null
      });
    } else {
      reject({
        message: 'FAILED',
        response: null,
        error: true,
        errorObj: err
      });
    }
  });
});

export const update = (criteria, data) => new Promise((resolve, reject) => {
  db.collection(entity).update(
      criteria,
      data,
      (err, result) => {
        if (!err) {
          resolve({
            message: 'SUCCESS',
            response: result,
            error: false,
            errorObj: null
          });
        } else {
          reject({
            message: 'FAILED',
            response: null,
            error: true,
            errorObj: err
          });
        }
      }
    );
});

export const remove = criteria => new Promise((resolve, reject) => {
  db.collection(entity).remove(criteria, (err, deletedItem) => {
    if (!err) {
      resolve({
        message: 'SUCCESS',
        response: deletedItem,
        error: false,
        errorObj: null
      });
    } else {
      reject({
        message: 'FAILED',
        response: null,
        error: true,
        errorObj: err
      });
    }
  });
});

export const isLinkAvailable = shortLink => new Promise((resolve, reject) => {
  db.collection(entity).findOne({short_link: shortLink}, (err, data) => {
    if (!err) {
      resolve({
        exists: (data !== null)
      });
    } else {
      reject({
        message: 'FAILED',
        response: null,
        error: true,
        errorObj: err
      });
    }
  });
});


export const createShortLink = (originalUrl, desiredUrl) => new Promise((resolve, reject) => {
  let encodedUrl = desiredUrl;
  console.log(`${originalUrl} to ${desiredUrl}`);
  // check for availability of desired url also
  // if available, apply that
  // else use the auto-generated one
  const payload = { originalUrl };
  if (desiredUrl) {
    encodedUrl = desiredUrl;
    isLinkAvailable(desiredUrl).then((data) => {
      if (!data) {
        encodedUrl = encode(payload, process.env.SECRET);
      } else {
        encodedUrl = desiredUrl;
      }
      resolve(create({
        original_link: originalUrl,
        short_link: encodedUrl,
        is_active: true,
        created_by: process.env.OWNER,
        date_created: new Date(),
        last_modified: new Date(),
      }));
    }).catch((err) => {
      encodedUrl = encode(payload, process.env.SECRET);
      resolve(create({
        original_link: originalUrl,
        short_link: encodedUrl,
        is_active: true,
        created_by: process.env.OWNER,
        date_created: new Date(),
        last_modified: new Date(),
      }));
    });
  } else {
    encodedUrl = encode(payload, process.env.SECRET);
    resolve(create({
      original_link: originalUrl,
      short_link: encodedUrl,
      is_active: true,
      created_by: process.env.OWNER,
      date_created: new Date(),
      last_modified: new Date(),
    }));
  }

});
