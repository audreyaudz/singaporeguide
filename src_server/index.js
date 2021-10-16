// yarn install dotenv
require('dotenv').config()
const {getTHIAPI} = require('./thi_api.js')
const {getNEAAPI} = require('./nea_api.js')

// Koa is a web server framework
// yarn install koa
const Koa = require('koa');
const app = new Koa();

// static allows serving files from the file system
// yarn install koa-static
const serve = require('koa-static')

// this allows creating routes similar to what rails does
const router = require('koa-router')()
 
// the server will serve any file in ./public
app.use(serve('./public'))

// This creates a GET route under /audz
router.get('/time', async ctx => { 
  ctx.body = 'Hello World, it is ' + new Date();
});

global.restaurant_cache = {}


router.get('/api/thi/:id', async ctx => {      
    console.log(ctx.params)   
    ctx.body = await getTHIAPI(ctx.params.id, ctx.query);
  });

router.get('/api/nea/:id', async ctx =>{
  ctx.body = await getNEAAPI(ctx.params.id);
});
  

app.use(router.routes())

app.listen( process.env.PORT, function(){ console.log ("Server listening on port "+process.env.PORT+ ". Press CRTL-C to stop")});