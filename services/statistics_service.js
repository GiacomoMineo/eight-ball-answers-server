const moment = require('moment')

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
