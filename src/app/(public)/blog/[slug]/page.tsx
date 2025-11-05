import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

async function getBlogPost(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'}/api/blog?where[slug][equals]=${slug}&where[status][equals]=published`,
      { next: { revalidate: 60 } }
    )
    const data = await response.json()
    return data.docs[0]
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      images: post.seo?.image?.url || post.featuredImage?.url ? [
        {
          url: post.seo?.image?.url || post.featuredImage?.url,
          alt: post.title,
        }
      ] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  // Helper to render Lexical content
  const renderContent = (content: any) => {
    if (!content?.root?.children) return null

    return content.root.children.map((node: any, index: number) => {
      if (node.type === 'paragraph') {
        return (
          <p key={index} className="mb-4">
            {node.children?.map((child: any, childIndex: number) => {
              if (child.type === 'text') {
                let text = <span key={childIndex}>{child.text}</span>
              
                if (child.format & 1) text = <strong key={childIndex}>{child.text}</strong>
                if (child.format & 2) text = <em key={childIndex}>{child.text}</em>
                if (child.format & 8) text = <code key={childIndex} className="bg-gray-100 px-1 rounded">{child.text}</code>
                
                return text
              }
              if (child.type === 'link') {
                return (
                  <a key={childIndex} href={child.url} className="text-blue-600 hover:underline">
                    {child.children?.[0]?.text}
                  </a>
                )
              }
              return null
            })}
          </p>
        )
      }

      if (node.type === 'heading') {
        const level = node.tag || 'h2'
        const HeadingTag = level as keyof JSX.IntrinsicElements
        const sizeClasses: Record<string, string> = {
          h1: 'text-4xl',
          h2: 'text-3xl',
          h3: 'text-2xl',
          h4: 'text-xl',
          h5: 'text-lg',
          h6: 'text-base',
        }

        return (
          <HeadingTag key={index} className={`${sizeClasses[level]} font-bold mt-8 mb-4`}>
            {node.children?.[0]?.text}
          </HeadingTag>
        )
      }

      if (node.type === 'list') {
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        return (
          <ListTag key={index} className={`mb-4 ml-6 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'}`}>
            {node.children?.map((listItem: any, liIndex: number) => (
              <li key={liIndex} className="mb-2">
                {listItem.children?.[0]?.children?.[0]?.text}
              </li>
            ))}
          </ListTag>
        )
      }

      if (node.type === 'quote') {
        return (
          <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4">
            {node.children?.[0]?.children?.[0]?.text}
          </blockquote>
        )
      }

      if (node.type === 'code') {
        return (
          <pre key={index} className="bg-gray-100 p-4 rounded overflow-x-auto mb-4">
            <code>{node.children?.[0]?.text}</code>
          </pre>
        )
      }

      return null
    })
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/blog" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Back to Blog
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories?.map((category: string) => (
            <span
              key={category}
              className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded"
            >
              {category}
            </span>
          ))}
        </div>

        <h1 className="text-5xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-gray-600">
          <span>
            By {post.author?.firstName} {post.author?.lastName}
          </span>
          <span>•</span>
          <time dateTime={post.publishedDate}>
            {new Date(post.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
      </header>

      {post.featuredImage && (
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={typeof post.featuredImage === 'object' ? post.featuredImage.url : post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        {renderContent(post.content)}
      </div>

      {post.tags && post.tags.length > 0 && (
        <footer className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-2">
            <span className="font-semibold">Tags:</span>
            {post.tags.map((tag: any, index: number) => (
              <span key={index} className="text-sm bg-gray-100 px-3 py-1 rounded">
                {tag.tag}
              </span>
            ))}
          </div>
        </footer>
      )}
    </article>
  )
}

