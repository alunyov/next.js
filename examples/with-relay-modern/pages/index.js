import Link from 'next/link'
import { graphql, fetchQuery } from 'react-relay'
import { initEnvironment } from '../lib/relay'
import BlogPosts from '../components/BlogPosts'

const Index = ({ viewer }) => (
  <div>
    <Link href="/about">
      <a>About</a>
    </Link>
    <BlogPosts viewer={viewer} />
  </div>
)

export async function getStaticProps() {
  const environment = initEnvironment()
  const queryProps = await fetchQuery(
    environment,
    graphql`
      query pages_indexQuery {
        viewer {
          ...BlogPosts_viewer
        }
      }
    `
  ).toPromise()
  const initialRecords = environment.getStore().getSource().toJSON()
  return {
    props: {
      ...queryProps,
      initialRecords,
    },
  }
}

export default Index
