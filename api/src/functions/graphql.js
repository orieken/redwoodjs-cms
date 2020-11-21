import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices,
} from '@redwoodjs/api'

import schemas from 'src/graphql/**/*.{js,ts}'
import services from 'src/services/**/*.{js,ts}'
import { db } from 'src/lib/db'

export const handler = (event, context, callback) => {
  if(process.env.NODE_ENV === 'production' && context?.clientContext?.user == null){
    return callback(null, {
      statusCode: 401,
      body: "Unauthorized"
    })
  }
  return (createGraphQLHandler({
    schema: makeMergedSchema({
      schemas,
      services: makeServices({ services }),
    }),
    db,
  }))(event,context,callback)
}
