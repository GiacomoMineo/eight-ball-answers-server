module.exports = {
  name: 'statistics',
  version: '1.0.0',
  register: function (server, options) {
    server.route({
      method: 'GET',
      path: '/api/stats',
      handler: function (request, h) {
        return 'ok'
      }
    })
  }
}
