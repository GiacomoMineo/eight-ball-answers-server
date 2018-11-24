const GameService = require('./../services/game_service')
const StatisticsService = require('./../services/statistics_service')

module.exports = {
  register: function (server, options) {
    server.decorate('server', 'GameService', GameService())
    server.decorate('server', 'StatisticsService', StatisticsService({
      mongo: server.mongo
    }))
  },
  name: 'services',
  version: '1.0.0'
}
