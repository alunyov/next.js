import { useMemo } from 'react'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise
export function fetchQuery(operation, variables, cacheConfig, _uploadables) {
  return fetch(process.env.GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, // Add authentication and other headers here
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then((response) => response.json())
}

function initEnvironment() {
  return new Environment({
    // Create a network layer from the fetch function
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  })
}

export function useEnvironment() {
  const store = useMemo(() => initEnvironment(), [])
  return store
}
