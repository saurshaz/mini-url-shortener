
<app-index>

  <section>
    <h4><label>{ message }</label> </h4>
    <br><label>URL:</label> 
    <!--  The application should have a form field where a user can put a valid url   -->
    <br><input type='text' id='originalLink' value={originalUrl}/>
    <!--  (The validation should be done via a direct call of the provided URL and the HTTP code should be evaluated).  -->
    <br><input type='button' id='btnValidateLink' value='validate' onclick={checkValidUrl} />
    <!--  - It should be possible to enter the desired short url in another extra field. The application should then check if the desired short url is already in use.  -->
    <br><label>Short URL:</label> 
    <br><input type='text' id='desiredLink' value={shortLink} />
    <!--  check if the short-link desired is available or not  -->
    <br><input type='button' id='btnIsShortLinkAvailable' value='check availability' onclick={checkAvailability} />
    <br><input type='button' value='shorten' id='btnShortLink' onclick={shortenURL} />
    <br>
        <a href="{shortLink}" id='lblShortLink' target='_blank' /> 
            Navigate to {shortLink} , {timesCalled}
        </a>
  </section>

  <script>
    const SERVER_HOST = 'https://shortlee.herokuapp.com/' || 'http://localhost:8091'
    var self = this

    self.timesCalled = 0;
    self.shortLink = '';
    self.message = 'Enter a URL to shorten';

    self.checkValidUrl = () => {
        const originalLink = self.root.querySelector('#originalLink').value;
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?'+ // port
  '(\\/[-a-z\\d%_.~+&:]*)*'+ // path
  '(\\?[;&a-z\\d%_.,~+&:=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        if(!pattern.test(originalLink)) {
            self.message = ' Please enter a valid URL. ';
        } else {
            self.originalUrl = originalLink;
            self.message = ' Please shorten this now. ';
        }
        self.update()
    }

    self.checkAvailability = () => {
        const desiredLink = self.root.querySelector('#desiredLink').value;
        fetch(`${SERVER_HOST}/api/v1/available/${desiredLink}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            }
        })
        .catch((err) => {
            console.error({
                'message': 'From shortlinks - err',
                'text': err
            })
             self.message = ' Please use some other shortlink. ';
            self.update()
        })
        .then((response) => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("Oops, we haven't got JSON!");
        })
        .then((response) => {
            console.info({
                'message': 'From shortlinks - response',
                'text': response && response.body
            })
            if(response && response.data && response.data.message && (response.data.error == false) && (response.data.message==='SUCCESS') && (!response.data.response || (response.data.response && !response.data.response._id))){
                self.desiredLink = desiredLink;
                self.message = ' Available. Shorten now. ';
            } else {
                self.message = ' Please use some other shortlink. ';
            }
            self.update()
        })
    }

    self.shortenURL = () => {
        const desiredLink = self.root.querySelector('#desiredLink').value;
        let request = `${SERVER_HOST}/api/v1/short-link`
        let requestJson = {
            desired: self.desiredLink || '',
            url: self.originalUrl
        }
        fetch(`${SERVER_HOST}/api/v1/short-link`, {
            method: "POST",
            body: JSON.stringify(requestJson),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .catch((err) => {
            console.error({
                'message': 'From shortlinks - err',
                'text': err
            })
             self.message = ' Some error occurred in generating shortlink. ';
            self.update()
        })
        .then((response) => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("Oops, we haven't got JSON!");
        })
        .then((response) => {
            console.info({
                'message': 'From shortlinks - response',
                'text': response && response.data
            })
            if(response && response.data && response.data.message && (response.data.error == false) && (response.data.message==='SUCCESS')){
                self.desiredLink = desiredLink;
                self.shortLink = `${SERVER_HOST}/api/v1/goto/${response.data.response.ops[0].short_link}`
                self.message = ' Shortened the link now. ';
                self.count = response.data.response.ops[0].count || 0
            } else {
                self.message = ' Some error occurred in generating shortlink. ';
                self.desiredLink = '';
                self.shortLink = ``
                self.count = 0
            }
            self.update()
        })
    }

  </script>

  <style>
    :scope {
      display: block;
      font-family: sans-serif;
      margin-right: 0;
      margin-bottom: 130px;
      margin-left: 50px;
      padding: 1em;
      text-align: center;
      color: #666;
    }
  </style>

</app-index>
