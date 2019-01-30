import 'dotenv-safe/config'

import * as wepublish from '@wepublish/server'
import {configuration} from './config'

wepublish.startServer({
  ...configuration,
  clientPath: './dist/client',
  workerPath: './dist/worker',
  dataSource: new wepublish.WeightedAggregatorDataSource(
    {
      id: 'a',
      dataSource: new wepublish.KarmaDataSource(
        process.env.KARMA_URL_A!,
        process.env.KARMA_USERNAME_A!,
        process.env.KARMA_PASSWORD_A!
      ),
      weight: 1
    },
    {
      id: 'b',
      dataSource: new wepublish.KarmaDataSource(
        process.env.KARMA_URL_B!,
        process.env.KARMA_USERNAME_B!,
        process.env.KARMA_PASSWORD_B!
      ),
      weight: 0.5
    }
  )
})
