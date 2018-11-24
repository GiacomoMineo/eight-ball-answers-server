module.exports = {
  register: function (server, options) {
    const handlers = {
      getStatistics: function (request, h) {
        return 'ok'
      }
    }

    const routes = [
      {
        method: 'GET',
        path: '/api/statistics',
        handler: handlers.getStatistics
      }
    ]

    server.route(routes)
  },
  name: 'statistics',
  version: '1.0.0'
}
