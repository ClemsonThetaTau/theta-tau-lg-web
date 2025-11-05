import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/data-entry/button'

interface MediaType {
  id: string
  url: string
  alt?: string
  width?: number
  height?: number
}

interface HeroBlock {
  blockType: 'hero'
  heading: string
  subheading?: string
  backgroundImage?: MediaType
  ctaText?: string
  ctaLink?: string
}

interface ContentBlock {
  blockType: 'content'
  richText: any
}

interface ImageGalleryBlock {
  blockType: 'imageGallery'
  title?: string
  images: Array<{
    image: MediaType
    caption?: string
  }>
}

interface BrothersDisplayBlock {
  blockType: 'brothersDisplay'
  heading: string
  filterByStatus: string[]
}

interface OfficersDisplayBlock {
  blockType: 'officersDisplay'
  heading: string
  showExecutiveCommittee: boolean
  showChairs: boolean
}

interface TwoColumnBlock {
  blockType: 'twoColumn'
  leftColumn: any
  rightColumn: any
}

interface CallToActionBlock {
  blockType: 'callToAction'
  heading: string
  description?: string
  buttons: Array<{
    label: string
    link: string
    style: 'primary' | 'secondary' | 'outline'
  }>
}

type Block =
  | HeroBlock
  | ContentBlock
  | ImageGalleryBlock
  | BrothersDisplayBlock
  | OfficersDisplayBlock
  | TwoColumnBlock
  | CallToActionBlock

interface RenderBlocksProps {
  layout: Block[]
}

// Component for rendering rich text
const RichText: React.FC<{ content: any }> = ({ content }) => {
  if (!content || !content.root || !content.root.children) {
    return null
  }

  return (
    <div className="prose prose-lg max-w-none">
      {content.root.children.map((node: any, index: number) => {
        if (node.type === 'paragraph') {
          return (
            <p key={index} className="mb-4">
              {node.children?.map((child: any, childIndex: number) => {
                if (child.type === 'text') {
                  let text = child.text
                  if (child.format) {
                    if (child.format & 1) text = <strong key={childIndex}>{text}</strong>
                    if (child.format & 2) text = <em key={childIndex}>{text}</em>
                    if (child.format & 8) text = <u key={childIndex}>{text}</u>
                  }
                  return text
                }
                if (child.type === 'link') {
                  return (
                    <a
                      key={childIndex}
                      href={child.fields?.url || '#'}
                      className="text-primary hover:underline"
                    >
                      {child.children?.[0]?.text || ''}
                    </a>
                  )
                }
                return null
              })}
            </p>
          )
        }
        if (node.type === 'heading') {
          const Tag = `h${node.tag}` as keyof JSX.IntrinsicElements
          return (
            <Tag key={index} className="font-bold mb-4">
              {node.children?.[0]?.text || ''}
            </Tag>
          )
        }
        if (node.type === 'list') {
          const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
          return (
            <ListTag key={index} className="mb-4 ml-6">
              {node.children?.map((item: any, itemIndex: number) => (
                <li key={itemIndex}>{item.children?.[0]?.children?.[0]?.text || ''}</li>
              ))}
            </ListTag>
          )
        }
        return null
      })}
    </div>
  )
}

// Component for Hero block
const Hero: React.FC<{ block: HeroBlock }> = ({ block }) => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {block.backgroundImage && (
        <Image
          src={block.backgroundImage.url}
          alt={block.backgroundImage.alt || ''}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wider">
          {block.heading}
        </h1>
        {block.subheading && (
          <p className="text-xl md:text-2xl text-white mb-8">{block.subheading}</p>
        )}
        {block.ctaText && block.ctaLink && (
          <Link href={block.ctaLink}>
            <Button size="lg" variant="outline">
              {block.ctaText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

// Component for Content block
const Content: React.FC<{ block: ContentBlock }> = ({ block }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <RichText content={block.richText} />
    </div>
  )
}

// Component for Image Gallery block
const ImageGallery: React.FC<{ block: ImageGalleryBlock }> = ({ block }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {block.title && (
        <h2 className="text-3xl font-bold text-center mb-8">{block.title}</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {block.images.map((item, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={item.image.url}
              alt={item.caption || item.image.alt || ''}
              fill
              className="object-cover rounded-lg"
            />
            {item.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-sm rounded-b-lg">
                {item.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Component for Brothers Display block
const BrothersDisplay: React.FC<{ block: BrothersDisplayBlock }> = async ({ block }) => {
  // Dynamically import the existing brother grid component
  const { default: BrotherGrid } = await import('@/app/(public)/brothers/brotherGrid')
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{block.heading}</h2>
      <BrotherGrid />
    </div>
  )
}

// Component for Officers Display block
const OfficersDisplay: React.FC<{ block: OfficersDisplayBlock }> = async ({ block }) => {
  // Fetch officers and users data
  try {
    const [officersRes, usersRes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/officers?where[isActive][equals]=true&depth=1`,
        { next: { revalidate: 60 } }
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/users?where[displayOnWebsite][equals]=true&depth=1&limit=200`,
        { next: { revalidate: 60 } }
      ),
    ])

    const officersData = await officersRes.json()
    const usersData = await usersRes.json()

    // Create a map of users by ID for easy lookup
    const brothersMap: { [key: string]: any } = {}
    usersData.docs?.forEach((user: any) => {
      brothersMap[user.id] = user
    })

    // Separate officers into EC and Chairs
    const ecOfficers = officersData.docs?.filter(
      (officer: any) => officer.type === 'executive-committee'
    )
    const chairOfficers = officersData.docs?.filter(
      (officer: any) => officer.type === 'committee-chair'
    )

    const { default: OfficerGrid } = await import('@/app/(public)/officers-chairs/officerGrid')
    const { default: ChairGrid } = await import('@/app/(public)/officers-chairs/chairGrid')

    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{block.heading}</h2>
        {block.showExecutiveCommittee && ecOfficers && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Executive Committee</h3>
            <OfficerGrid officers={{ docs: ecOfficers }} brothers={brothersMap} />
          </div>
        )}
        {block.showChairs && chairOfficers && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Committee Chairs</h3>
            <ChairGrid officers={{ docs: chairOfficers }} brothers={brothersMap} />
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching officers:', error)
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-red-500">
        Failed to load officers. Please try again later.
      </div>
    )
  }
}

// Component for Two Column block
const TwoColumn: React.FC<{ block: TwoColumnBlock }> = ({ block }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <RichText content={block.leftColumn} />
        </div>
        <div>
          <RichText content={block.rightColumn} />
        </div>
      </div>
    </div>
  )
}

// Component for Call to Action block
const CallToAction: React.FC<{ block: CallToActionBlock }> = ({ block }) => {
  return (
    <div className="w-full bg-primary py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-wider">
          {block.heading}
        </h2>
        {block.description && (
          <p className="text-xl text-white mb-8">{block.description}</p>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          {block.buttons?.map((button, index) => (
            <Link key={index} href={button.link}>
              <Button
                size="lg"
                variant={button.style === 'outline' ? 'outline' : button.style === 'secondary' ? 'secondary' : 'default'}
              >
                {button.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main RenderBlocks component
export const RenderBlocks: React.FC<RenderBlocksProps> = ({ layout }) => {
  if (!layout || layout.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">No content blocks have been added to this page yet.</p>
      </div>
    )
  }

  return (
    <>
      {layout.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            return <Hero key={index} block={block} />
          case 'content':
            return <Content key={index} block={block} />
          case 'imageGallery':
            return <ImageGallery key={index} block={block} />
          case 'brothersDisplay':
            return <BrothersDisplay key={index} block={block} />
          case 'officersDisplay':
            return <OfficersDisplay key={index} block={block} />
          case 'twoColumn':
            return <TwoColumn key={index} block={block} />
          case 'callToAction':
            return <CallToAction key={index} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}

