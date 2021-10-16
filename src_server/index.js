// yarn install dotenv
require('dotenv').config()
const fs = require('fs').promises

async function exists (path) {  
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

const {getTHIAPI} = require('./thi_api.js')
const {getNEAAPI} = require('./nea_api.js')



const bent = require('bent')
const getBuffer = bent('buffer')
MurmurHash3 = require('imurmurhash');


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
 
// A simple api into THI's image library  
router.get('/images/thi/:id', async ctx => {  
  let url = "https://tih-api.stb.gov.sg/media/v1/download/uuid/"  + ctx.params.id + "?apikey=" + process.env.THI_APIKEY
  
  // create a unique key for the URL to be used with caching
  var cacheKey = MurmurHash3(url).result();
  // if we already have this file on disk, serve it from there
  if (await exists('./cache/' + cacheKey))
  {
    console.log("Serving image from cache")
    ctx.body = require('fs').createReadStream('./cache/' + cacheKey);
  }
  else /* we don't have the file, so we get it from THI */ 
  {
    console.log("Getting image from THI", url)
    buffer = await getBuffer(url); 
    await fs.writeFile('./cache/'+cacheKey, buffer)
    ctx.body = buffer
  }
})

router.get('/api/nea/:id', async ctx =>{
  ctx.body = await getNEAAPI(ctx.params.id);
});
  

app.use(router.routes())

app.listen( process.env.PORT, function(){ console.log ("Server listening on port "+process.env.PORT+ ". Press CRTL-C to stop")});