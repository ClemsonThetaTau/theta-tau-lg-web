import { getPayload } from 'payload'
import config from '@/payload.config'

async function seedPages() {
  const payload = await getPayload({ config })

  console.log('🌱 Seeding initial pages...')

  // Check if pages already exist
  const existingPages = await payload.find({
    collection: 'pages',
    limit: 1,
  })

  if (existingPages.docs.length > 0) {
    console.log('✅ Pages already exist, skipping seed')
    return
  }

  // Create Home page
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: '',
      status: 'published',
      showInNav: true,
      navOrder: 1,
      navLabel: 'Home',
      layout: [
        {
          blockType: 'hero',
          heading: 'THETA TAU LAMBDA GAMMA',
          subheading: "Clemson University's Premier Professional Engineering Fraternity",
          ctaText: 'Learn More',
          ctaLink: '/about-us',
        },
        {
          blockType: 'content',
          richText: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      format: 0,
                      text: 'Welcome to the Lambda Gamma chapter of Theta Tau at Clemson University. We are a professional engineering fraternity built on the pillars of Brotherhood, Professionalism, and Service.',
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          blockType: 'callToAction',
          heading: 'JOIN THE BROTHERHOOD!',
          description: 'Check out our Rush section for more information',
          buttons: [
            {
              label: 'Rush Information',
              link: '/rush',
              style: 'outline',
            },
          ],
        },
      ],
      seo: {
        title: 'Clemson Theta Tau - Lambda Gamma Chapter',
        description:
          "The official webpage of the Clemson University Lambda Gamma chapter of Theta Tau, the nation's oldest and largest professional engineering fraternity.",
      },
    },
  })

  console.log('✅ Created Home page')

  // Create About Us page
  await payload.create({
    collection: 'pages',
    data: {
      title: 'About Us',
      slug: 'about-us',
      status: 'published',
      showInNav: true,
      navOrder: 2,
      layout: [
        {
          blockType: 'hero',
          heading: 'About Theta Tau',
          subheading: 'Learn about our history and values',
        },
        {
          blockType: 'content',
          richText: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'heading',
                  tag: 'h2',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      format: 0,
                      text: 'Our Mission',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      format: 0,
                      text: 'Theta Tau is a professional engineering fraternity. The purpose of Theta Tau is to develop and maintain a high standard of professional interest among its members, and to unite them in a strong bond of fraternal fellowship.',
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
      seo: {
        title: 'About Us - Clemson Theta Tau',
        description: 'Learn about the Lambda Gamma chapter of Theta Tau at Clemson University.',
      },
    },
  })

  console.log('✅ Created About Us page')

  // Create Brothers page
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Brothers',
      slug: 'brothers',
      status: 'published',
      showInNav: true,
      navOrder: 3,
      layout: [
        {
          blockType: 'hero',
          heading: 'Meet the Brothers',
          subheading: 'Get to know the members of Lambda Gamma',
        },
        {
          blockType: 'brothersDisplay',
          heading: 'Active Brothers',
          filterByStatus: ['active', 'alumni'],
        },
      ],
      seo: {
        title: 'Brothers - Clemson Theta Tau',
        description: 'Meet the members of the Lambda Gamma chapter.',
      },
    },
  })

  console.log('✅ Created Brothers page')

  // Create Officers & Chairs page
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Officers & Chairs',
      slug: 'officers-chairs',
      status: 'published',
      showInNav: true,
      navOrder: 4,
      layout: [
        {
          blockType: 'hero',
          heading: 'Chapter Leadership',
          subheading: 'Meet our Executive Committee and Committee Chairs',
        },
        {
          blockType: 'officersDisplay',
          heading: 'Current Leadership',
          showExecutiveCommittee: true,
          showChairs: true,
        },
      ],
      seo: {
        title: 'Officers & Chairs - Clemson Theta Tau',
        description: 'Meet the leadership of the Lambda Gamma chapter.',
      },
    },
  })

  console.log('✅ Created Officers & Chairs page')

  // Create Rush page
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Rush',
      slug: 'rush',
      status: 'published',
      showInNav: true,
      navOrder: 5,
      layout: [
        {
          blockType: 'hero',
          heading: 'Join Theta Tau',
          subheading: 'Learn about our recruitment process',
        },
        {
          blockType: 'content',
          richText: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'heading',
                  tag: 'h2',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      format: 0,
                      text: 'Rush Information',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      format: 0,
                      text: 'Interested in joining Theta Tau? Attend our rush events to learn more about our fraternity and meet our members!',
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          blockType: 'callToAction',
          heading: 'Ready to Join?',
          description: 'Contact us to learn more about our next rush',
          buttons: [
            {
              label: 'Contact Us',
              link: '/contact',
              style: 'primary',
            },
          ],
        },
      ],
      seo: {
        title: 'Rush - Clemson Theta Tau',
        description: 'Learn about joining the Lambda Gamma chapter of Theta Tau.',
      },
    },
  })

  console.log('✅ Created Rush page')

  console.log('🎉 All pages seeded successfully!')
  process.exit(0)
}

seedPages().catch((error) => {
  console.error('❌ Error seeding pages:', error)
  process.exit(1)
})

