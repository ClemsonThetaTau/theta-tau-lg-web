import { getPayloadClient } from '@/payload/payload'

// Define the stats type
export interface ChapterStatsData {
  title: string;
  labels: string[];
  data: number[];
  backgroundColor: string[];
}

// This is a server component that fetches data from Payload CMS
export async function getChapterStatsData(): Promise<ChapterStatsData> {
  // Default values in case CMS data is not available yet
  const defaultStats: ChapterStatsData = {
    title: 'Members',
    labels: [
      'Mechanical Engineering',
      'Bioengineering',
      'Industrial Engineering',
      'Chemical Engineering',
      'General Engineering',
      'Electrical Engineering',
      'Civil Engineering',
      'Biosystems Engineering',
      'Ceramic and Materials Engineering',
      'Environmental Systems Engineering',
      'Computer Engineering',
      'Computer Science',
    ],
    data: [25, 25, 9, 8, 6, 5, 3, 2, 2, 1, 2, 7],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(153, 102, 255)',
      'rgb(255, 159, 64)',
      'rgb(255, 120, 180)',
      'rgb(120, 200, 255)',
      'rgb(255, 220, 100)',
      'rgb(100, 200, 180)',
      'rgb(200, 150, 255)',
      'rgb(100, 149, 237)',
    ],
  }

  try {
    // Fetch the about us content from Payload CMS
    const client = await getPayloadClient()
    const response = await client.find({
      collection: 'about-us-content',
      limit: 1,
    })

    // If there's data, use it
    if (response.docs.length > 0 && response.docs[0].chapterStats) {
      const aboutUsContent = response.docs[0]
      
      // Update the title if available
      if (aboutUsContent.chapterStats.title) {
        defaultStats.title = aboutUsContent.chapterStats.title
      }

      // Update the stats if available
      if (aboutUsContent.chapterStats.stats && aboutUsContent.chapterStats.stats.length > 0) {
        // Extract labels and data from the stats
        const labels: string[] = []
        const data: number[] = []
        
        aboutUsContent.chapterStats.stats.forEach((stat: any) => {
          if (stat.label && stat.value) {
            labels.push(stat.label)
            data.push(parseInt(stat.value, 10))
          }
        })
        
        // Only update if we have valid data
        if (labels.length > 0 && data.length > 0) {
          defaultStats.labels = labels
          defaultStats.data = data
          
          // Generate colors if needed
          if (labels.length > defaultStats.backgroundColor.length) {
            // Add more colors if needed
            while (defaultStats.backgroundColor.length < labels.length) {
              // Generate a random color
              const r = Math.floor(Math.random() * 255)
              const g = Math.floor(Math.random() * 255)
              const b = Math.floor(Math.random() * 255)
              defaultStats.backgroundColor.push(`rgb(${r}, ${g}, ${b})`)
            }
          } else {
            // Trim colors if needed
            defaultStats.backgroundColor = defaultStats.backgroundColor.slice(0, labels.length)
          }
        }
      }
    }
  } catch (error) {
    // If there's an error, use the default values
    console.error('Error fetching chapter stats data:', error)
  }

  return defaultStats
}
