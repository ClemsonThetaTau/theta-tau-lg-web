import NationalHistory from '@/components/public/sections/about-us/national-history'
import ChapterHistory from '@/components/public/sections/about-us/chapter-history'
import ChapterStats from '@/components/public/sections/about-us/chapter-stats'

export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center">
      <NationalHistory />
      <ChapterHistory />
      <ChapterStats />
    </div>
  )
}
