import { graphql } from 'graphql'
import { schema, rootValue } from '../../lib/graphql.mjs'

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  })
  let response = { data: null }
  if (req.method === 'POST') {
    const buffers = []
    for await (const chunk of req) {
      buffers.push(chunk)
    }
    const { query, variables } = JSON.parse(Buffer.concat(buffers).toString())
    response = await graphql({
      schema,
      rootValue,
      source: query,
    })
  }
  res.end(JSON.stringify(response))
}

export const config = {
  api: {
    bodyParser: false,
  },
}
