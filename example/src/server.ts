import 'dotenv-safe/config'

import * as wepublish from '@wepublish/server'
import {configuration} from './config'

wepublish.startServer({
  ...configuration,
  clientPath: './dist/client',
  workerPath: './dist/worker',
  dataSource: new wepublish.WeightedAggregatorDataSource(
    {
      id: 'test',
      dataSource: new wepublish.KarmaDataSource(
        process.env.KARMA_URL!,
        process.env.KARMA_USERNAME!,
        process.env.KARMA_PASSWORD!
      ),
      weight: 1
    },
    {
      id: 'test2',
      dataSource: new wepublish.KarmaDataSource(
        process.env.KARMA_URL!,
        process.env.KARMA_USERNAME!,
        process.env.KARMA_PASSWORD!
      ),
      weight: 0.1
    }
  )
})
