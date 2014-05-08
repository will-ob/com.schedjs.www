
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
  proxy.proxyRequest(req, resp, {
    host: 'localhost',
    port: 3001
  })
)

port = process.env.PORT || 3000

app.listen(port)
console.log("listening on port #{port}")

