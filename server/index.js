const express = require('express')
const bodyParser = require('body-parser')
const {
  Nuxt,
  Builder
} = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const models = require('../models')
const routes = require('./routes/index');
const todos = require('./routes/todos');
app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  models.sequelize.sync().then(() => {
    // use body parser before routes
    app.use(bodyParser.urlencoded({
      extended: false
    }))
    app.use(bodyParser.json())

    // routes
    app.use('/api', routes)
    app.use('/api/todos', todos)

    // Give nuxt middleware to express
    app.use(nuxt.render)

    // Listen the server
    app.listen(port, host)
    console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
  });
}
start()
