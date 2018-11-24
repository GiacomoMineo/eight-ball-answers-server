const Joi = require('joi')

module.exports = {
  register: function (server, options) {
    const handlers = {
      getStatistics: function (request, h) {
        const result = server.StatisticsService.getDailyQuestions(
          request.query.from,
          request.query.to
        )
        return result
      }
    }

    const routes = [
      {
        method: 'GET',
        path: '/api/statistics/question',
        handler: handlers.getStatistics,
        options: {
          validate: {
            query: {
              from: Joi.number(),
              to: Joi.number()
            }
          }
        }
      }
    ]

    server.route(routes)
  },
  name: 'statistics',
  version: '1.0.0'
}
