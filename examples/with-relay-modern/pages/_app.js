import { Suspense } from 'react'
import { ReactRelayContext } from 'react-relay'
import { useEnvironment } from '../lib/relay'
import ErrorBoundary from '../components/ErrorBoundary'

export default function App({ Component, pageProps }) {
  const environment = useEnvironment()

  return (
    <ErrorBoundary>
      <Suspense fallback="Loading...">
        <ReactRelayContext.Provider value={{ environment }}>
          <Component {...pageProps} />
        </ReactRelayContext.Provider>
      </Suspense>
    </ErrorBoundary>
  )
}
