'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { ChartOptions } from 'chart.js/auto';

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ChapterStats() {
  const data = {
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
    datasets: [
      {
        label: 'Members',
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
        Members
      </h2>
      <Doughnut data={data} options={options} />
    </section>
  )
}
