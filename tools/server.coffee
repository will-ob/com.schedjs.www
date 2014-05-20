
express = require('express')
serve = require('serve-static')
logger = require('morgan')
httpProxy = require('http-proxy')
errorHandler = require('express-error-handler')
env = require('node-env-file')

env(__dirname + '/../.env')

proxy = new httpProxy.createProxyServer({
  target: "http://#{process.env.HOPPER_API_HOST}:#{process.env.HOPPER_API_PORT}"
})

# Serve build/
app = express()
  .use(logger())
  .use(errorHandler())
  .use(serve('./build/'))

app.all('*', (req, resp) ->
  req.headers.origin = "http://#{process.env.HOPPER_API_HOST}:#{process.env.HOPPER_API_PORT}"
  req.headers.host = "#{process.env.HOPPER_API_HOST}:#{process.env.HOPPER_API_PORT}"
  proxy.proxyRequest(req, resp, {
    host: "#{process.env.HOPPER_API_HOST}",
    port: process.env.HOPPER_API_PORT
  })
)

port = process.env.PORT || 3000

app.listen(port)
console.log("listening on port #{port}")

