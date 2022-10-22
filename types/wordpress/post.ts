export type WordpressPosts = Array<WordpressPost>
export interface WordpressPost {
  title: {
    rendered: string
  }
  slug: string
  content: {
    rendered: string
  }
}

export interface Post {
  slug: string
  title: string
  content: string
}

export function parsePosts(data: Array<WordpressPost>): Array<Post> {
  const parsedPosts: Array<Post> = []
  data?.forEach(post => {
    parsedPosts.push(parsePost(post))
  })
  return parsedPosts
}

export function parsePost(data: WordpressPost): Post {
  return {
    slug: data?.slug || '',
    title: data?.title.rendered || '',
    content: data?.content.rendered || '',
  }
}
