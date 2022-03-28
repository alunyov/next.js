import { createFragmentContainer, graphql } from 'react-relay'
import styled from 'styled-components'
import BlogPostPreview from './BlogPostPreview'

const BlogPosts = ({ viewer }) => (
  <div>
    <h1>Blog posts</h1>
    <ul>
      {viewer.allBlogPosts?.edges?.map(({ node }) => (
        <BlogPostPreview key={node.id} post={node} />
      ))}
    </ul>
  </div>
)

const Styled = styled.div`
  display: flex;
  cursor: unset;

  :hover {
    cursor: unset;
  }

  > * + * {
    border-left: 0 !important;
  }

  div[data-nodeid] {
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid var(--text-color);
  }
`

export default createFragmentContainer(BlogPosts, {
  viewer: graphql`
    fragment BlogPosts_viewer on Viewer {
      allBlogPosts(first: 10, orderBy: { createdAt: desc }) {
        edges {
          node {
            ...BlogPostPreview_post
            id
          }
        }
      }
    }
  `,
})
