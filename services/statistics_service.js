// options: { mongo }
module.exports = (options) => {
  const db = options.mongo.db
  const statisticsColl = db.collection('statistics')

  return {
    async saveQuestionAnswerPair (questionText, answer) {
      try {
        const result = await statisticsColl.insertOne({
          questionText: questionText,
          answerText: answer.text,
          answerAssertion: answer.assertion
        })
        return result
      } catch (err) {
        throw new Error('Internal MongoDB error', err)
      }
    }
  }
}
