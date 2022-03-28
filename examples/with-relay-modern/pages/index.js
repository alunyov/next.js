import Link from 'next/link'
import { graphql, useLazyLoadQuery } from 'react-relay'
import BlogPosts from '../components/BlogPosts'

const query = graphql`
  query pages_indexQuery {
    viewer {
      ...BlogPosts_viewer
    }
  }
`

const Index = () => {
  const data = useLazyLoadQuery(query, {})
  return (
    <div>
      <Link href="/about">
        <a>About</a>
      </Link>
      <BlogPosts viewer={data?.viewer} />
    </div>
  )
}

export default Index
