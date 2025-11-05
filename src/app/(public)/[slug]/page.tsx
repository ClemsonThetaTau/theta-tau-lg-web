import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { RenderBlocks } from '@/components/public/render-blocks'

interface PageProps {
  params: {
    slug: string
  }
}

async function getPage(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/pages?where[slug][equals]=${slug}&where[status][equals]=published&depth=2`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    )

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.docs && data.docs.length > 0 ? data.docs[0] : null
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPage(params.slug)

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: page.seo?.title || page.title || 'Clemson Theta Tau',
    description: page.seo?.description || "The official webpage of the Clemson University Lambda Gamma chapter of Theta Tau",
    openGraph: {
      title: page.seo?.title || page.title,
      description: page.seo?.description || '',
      images: page.seo?.image?.url ? [page.seo.image.url] : [],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const page = await getPage(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <RenderBlocks layout={page.layout} />
    </div>
  )
}

// Generate static params for existing pages at build time
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/pages?where[status][equals]=published&limit=100`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    )

    if (!res.ok) {
      return []
    }

    const data = await res.json()
    return data.docs?.map((page: any) => ({
      slug: page.slug,
    })) || []
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

