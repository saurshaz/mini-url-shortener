<app-main>

  <app-index>
    <h1>{ title }</h1>
    <p>{ body }</p>
    <ul if={ isFirst }>
      <li each={ data }><a href="#first/{ id }">{ title }</a></li>
    </ul>
  </app-index>

  <script>
    var self = this
    self.title = 'Now loading...'
    
    var r = route.create()
    r('index',    index      ) 

    function index() {
      self.update({
        title:  "mini links creator",
        body:  "Create Short-Links for your URLs!",
        isFirst: false
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
    ul {
      padding: 10px;
      list-style: none;
    }
    li {
      display: inline-block;
      margin: 5px;
    }
    @media (min-width: 480px) {
      :scope {
        margin-right: 200px;
        margin-bottom: 0;
      }
    }
  </style>

</app-main>
