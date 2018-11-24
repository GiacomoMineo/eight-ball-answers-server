const GameModel = require('./../models/game')

module.exports = () => {
  return {
    getRandomInt (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    },
    getRandomAnswer () {
      return GameModel.answers[this.getRandomInt(0, GameModel.answers.length)]
    }
  }
}
