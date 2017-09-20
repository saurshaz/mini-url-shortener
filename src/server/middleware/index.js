import request from 'request';

export const getNewAccessToken = (optionsJson, cb) => {
  request(optionsJson, (error, response, body) => {
    if (error) {
      cb({error});
    } else {
      cb(null, body);
    }
  });
};
