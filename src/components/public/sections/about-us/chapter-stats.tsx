import { getChapterStatsData } from './chapter-stats-data'
import ChapterStatsClient from './chapter-stats-client'

// This is a server component that fetches data from Payload CMS
export default async function ChapterStats() {
  // Fetch the chapter stats data
  const statsData = await getChapterStatsData()
  
  return <ChapterStatsClient statsData={statsData} />
}
