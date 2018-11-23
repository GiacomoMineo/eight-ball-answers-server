const answers = require('./answers.json')

module.exports = {
  name: 'game',
  version: '1.0.0',
  register: function (server, options) {
    server.route({
      method: 'POST',
      path: '/api/game/question',
      handler: function (request, h) {
        return answers[0]
      }
    })
  }
}
