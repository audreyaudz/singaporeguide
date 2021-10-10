// Koa is a web server framework
const Koa = require('koa');
const app = new Koa();

// static allows serving files from the file system
const static = require('koa-static')

// this allows creating routes similar to what rails does
const Router = require('koa-router')
const router = require('koa-router')()
  
// the server will serve any file in ./public
app.use(static('./public'))

// This creates a GET route under /audz
router.get('/time', async ctx => { 
  ctx.body = 'Hello World, it is ' + new Date();
});

content={
  "Name": "Audrey",
  "Job" : "Kon"
}

router.get('/search', async ctx => { 
    search = ctx.query['q']
    ctx.body = 'You searched for:' + search + " and the result was " + content[search]


    // ... do something with the search


  });
  

app.use(router.routes())

app.listen(3000, function(){ console.log ("Server listening on port 3000. Press CRTL-C to stop")});