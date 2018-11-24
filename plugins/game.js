const Joi = require("joi");

module.exports = {
  register: function(server, options) {
    const handlers = {
      createQuestion: async function(request, h) {
        const answer = server.GameService.getRandomAnswer();
        await server.StatisticsService.saveQA(
          request.payload.questionText,
          answer
        );
        return answer;
      }
    };

    const routes = [
      {
        method: "POST",
        path: "/api/game/question",
        handler: handlers.createQuestion,
        options: {
          validate: {
            payload: {
              questionText: Joi.string().required()
            }
          }
        }
      }
    ];

    server.route(routes);
  },
  name: "game",
  version: "1.0.0"
};
