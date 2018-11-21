module.exports = {
  name: 'game',
  version: '1.0.0',
  register: function (server, options) {
    server.route({
      method: 'GET',
      path: '/game',
      handler: function (request, h) {
        return 'ok'
      }
    })
  }
}
