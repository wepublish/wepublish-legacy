require('dotenv-safe').config()

const wepublish = require('@wepublish/server')

wepublish.startServer({
  dataSource: new wepublish.WeightedAggregatorDataSource(
    {
      id: 'test',
      dataSource: new wepublish.KarmaDataSource(
        process.env.KARMA_URL,
        process.env.KARMA_USERNAME,
        process.env.KARMA_PASSWORD
      ),
      weight: 1
    },
    {
      id: 'test2',
      dataSource: new wepublish.KarmaDataSource(
        process.env.KARMA_URL,
        process.env.KARMA_USERNAME,
        process.env.KARMA_PASSWORD
      ),
      weight: 0.1
    }
  )
})
