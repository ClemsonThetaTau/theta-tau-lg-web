import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

async function getBlogPosts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'}/api/blog?where[status][equals]=published&sort=-publishedDate&limit=12`,
      { next: { revalidate: 60 } } // Revalidate every 60 seconds
    )
    const data = await response.json()
    return data.docs
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Blog</h1>
      <p className="text-center text-gray-600 mb-12">
        News, updates, and stories from Theta Tau Lambda Gamma
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <article key={post.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {post.featuredImage && (
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={typeof post.featuredImage === 'object' ? post.featuredImage.url : post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              )}
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  {post.categories?.map((category: string) => (
                    <span
                      key={category}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    {post.author?.firstName} {post.author?.lastName}
                  </span>
                  <time dateTime={post.publishedDate}>
                    {new Date(post.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

