
express = require('express')
serve = require('serve-static')
logger = require('morgan')

# Serve build/
app = express()
  .use(logger())
  .use(serve('./build/'))

port = process.env.PORT || 3000
app.listen(port)
console.log("listening on port #{port}")
