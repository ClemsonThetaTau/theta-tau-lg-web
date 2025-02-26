'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { ChartOptions } from 'chart.js/auto'
import { ChapterStatsData } from './chapter-stats-data'

ChartJS.register(ArcElement, Tooltip, Legend)

interface ChapterStatsClientProps {
  statsData: ChapterStatsData
}

export default function ChapterStatsClient({ statsData }: ChapterStatsClientProps) {
  const data = {
    labels: statsData.labels,
    datasets: [
      {
        label: 'Members',
        data: statsData.data,
        backgroundColor: statsData.backgroundColor,
        hoverOffset: 4,
      },
    ],
  }

  const options: ChartOptions<'doughnut'> = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    },
  }

  return (
    <section className="m-8 h-96 w-11/12 md:w-[36rem]">
      <h2 className="text-primary m-4 text-xl md:text-5xl font-bold w-auto text-center">
        {statsData.title}
      </h2>
      <Doughnut data={data} options={options} />
    </section>
  )
}
