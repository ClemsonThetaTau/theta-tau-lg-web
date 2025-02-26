import Image from 'next/image'
import { getPayloadClient } from '@/payload/payload'

// Define the image type
interface MediaImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

// This is a server component that fetches data from Payload CMS
export default async function ChapterHistory() {
  // Default values in case CMS data is not available yet
  let chapterHistoryData = {
    title: 'Chapter History',
    content: `
      <p>The Lambda Gamma chapter of Theta Tau was founded by Scott Kultau, Jason
      Gamble, and Penn Sanders on January 13, 2001. The installment ceremony
      was conducted by the Grand Region at that time, Grand Regent Glen A.
      Wilcox.</p>
      <p>Throughout the years, Lambda Gamma has continued to grow without losing
      the core values of being a brotherhood of Theta Tau.</p>
      <p>The Lambda Gamma chapter of Theta Tau respect the culture of
      brotherhood, lifelong relationships, and connection, mutual respect and
      professionalism, balance of social, service, and professional
      activities, and diversity of engineering disciplines and demographics.</p>
      <p>The oldest symbol of the fraternity still in use is the coat of arms,
      adopted in 1906, which may only be displayed or worn by members.</p>
    `,
    image: null as MediaImage | null,
  }

  try {
    // Fetch the about us content from Payload CMS
    const client = await getPayloadClient()
    const response = await client.find({
      collection: 'about-us-content',
      limit: 1,
    })

    // If there's data, use it
    if (response.docs.length > 0 && response.docs[0].chapterHistory) {
      const aboutUsContent = response.docs[0]
      
      // Update the title if available
      if (aboutUsContent.chapterHistory.title) {
        chapterHistoryData.title = aboutUsContent.chapterHistory.title
      }

      // Update the content if available
      if (aboutUsContent.chapterHistory.content) {
        chapterHistoryData.content = aboutUsContent.chapterHistory.content
      }

      // Update the image if available
      if (aboutUsContent.chapterHistory.image) {
        chapterHistoryData.image = aboutUsContent.chapterHistory.image
      }
    }
  } catch (error) {
    // If there's an error, use the default values
    console.error('Error fetching chapter history data:', error)
  }

  // Function to render HTML content safely
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent }
  }

  return (
    <section className="bg-primary md:px-32 py-2 my-2 md:pb-16 md:pt-12 md:my-8">
      <h2 className="text-secondary-foreground m-4 text-xl md:text-5xl font-bold w-auto text-center">
        {chapterHistoryData.title}
      </h2>
      
      <div className="flex flex-col md:flex-row items-center">
        {chapterHistoryData.image && (
          <div className="md:w-1/3 p-4">
            <Image 
              src={chapterHistoryData.image.url} 
              alt={chapterHistoryData.image.alt || "Chapter History Image"} 
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        )}
        
        <div className={`${chapterHistoryData.image ? 'md:w-2/3' : 'w-full'}`}>
          <div 
            className="text-secondary-foreground md:text-lg p-2 mx-2 md:mx-8 md:px-8 chapter-history-content"
            dangerouslySetInnerHTML={createMarkup(chapterHistoryData.content)}
          />
        </div>
      </div>
    </section>
  )
}
