##################
##    LT- API   ##
##################


#### How to run this up ?

```
## short-links
- copy and rename `backend/config/sample.env` as `backend/config/.env`. adjust values
- docker-compose up --build
```

##### What this starter has ?
- `Node.JS` based backend (express server)
- `Docker` and `docker-compose` to glue the setup up

#### What is this ?
- A URL shortener



#### Node.JS app has

- `bunyan` for logging
- `habitat` for env management
- `express` framework
- `mocha` based unit tests
- `sequelize` based data access from `sqlite3`

### How to get tests running

 - set up the environment variables properly in config folder
 - import the lt-test.sql dump from dump folder into mysql
 - npm run test

### TODOs
- The application should have a form field where a user can put a valid url (The validation should be done via a direct call of the provided URL and the HTTP code should be evaluated).
- The application should then generate a short URL, like for example: http://domain.com/abcde.
- It should be possible to enter the desired short url in another extra field. The application should then check if the desired short url is already in use.
- The application should store the original and the short url in a DB.
- When the user enters the short URL in a browser, it should redirect to the original URL.
- The application should have a configuration file, as well as a logging system
- The original-short url pair should be automatically deleted from the DB after 15 days
- The application should count the usage of the short URL
- There should be an (simple) API to create short URLs

https://www.getpostman.com/collections/7ac581ea61378bdf4f29