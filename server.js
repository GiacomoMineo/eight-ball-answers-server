'use strict'

const Hapi = require('hapi')

const configuration = require('./configuration.json')[process.env.NODE_ENV || 'local']

const server = Hapi.server({
  port: 3001,
  host: 'localhost'
})

const init = async () => {
  await server.register([
    {
      plugin: require('hapi-pino'),
      options: {
        prettyPrint: process.env.NODE_ENV !== 'prod',
        allTags: configuration.loggerLevel,
        logEvents: ['response', 'onPostStart', '']
      }
    },
    require('./plugins/game'),
    require('./plugins/statistics')
  ])

  await server.start()
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()