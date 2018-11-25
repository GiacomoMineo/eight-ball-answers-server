const moment = require('moment')
const Boom = require('boom')

// options: { mongo }
module.exports = options => {
  const db = options.mongo.db
  const dailyColl = db.collection('daily')

  return {
    async saveDailyQA (questionText, answer) {
      const date = moment()
      const partitionDate = parseInt(date.format('YYYYMMDD'))

      try {
        return await dailyColl.updateOne(
          { partitionDate: partitionDate },
          {
            $inc: {
              questionsCount: 1,
              ['assertion.' + answer.assertion]: 1
            },
            $set: {
              when: date.toDate()
            }
          },
          { upsert: true }
        )
      } catch (err) {
        throw new Error('Internal MongoDB error', err)
      }
    },

    async getDailyStatistics (from, to) {
      if (from > to || to < from) {
        return Boom.badRequest('The from parameter must be lower than the to parameter.')
      }

      try {
        return await dailyColl.find({
          partitionDate: { $gte: from, $lte: to }
        }).project({ _id: 0, questionsCount: 1, assertion: 1, partitionDate: 1 }).toArray()
      } catch (err) {
        throw new Error('Internal MongoDB error', err)
      }
    },

    async getDailyAnswers () {}
  }
}
