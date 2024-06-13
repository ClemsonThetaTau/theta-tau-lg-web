// It's wild how incredibly useful chat gpt has become, this woudl've taken forever
// before but now its just a couple minutes of prompt engineering, kinda speeding thru
// deving this website rn. I'm curious to see what ppl think of it.

// I'm also curious who's gonna read this, the next web chair perhaps? or somebody
// even later down the line. If you are one of those ppl and don't know me. Hello!
// I'm gonna be a Junior next year and I'm a CS Major, names AP, sorry for the ratshit
// code, I'm just speeding thru. Finished the serious part of the backend and coded this
// app in like 5 hours over the past day or two. Just kinda working on this whenever my
// AI research lightens up enough for me to squeeze in some extra time.

import { BrotherInfo, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<BrotherInfo[]> {
  // Fetch data from your API here.
  return [
    {
      id: "b12345",
      firstName: "John",
      lastName: "Doe",
      major: "Computer Science",
      badgeNumber: 101,
      pledgeClass: "Alpha",
      status: "active",
      email: "john.doe@example.com",
      phone: "123-456-7890"
    },
    {
      id: "b12346",
      firstName: "Jane",
      lastName: "Smith",
      major: "Mechanical Engineering",
      badgeNumber: 102,
      pledgeClass: "Beta",
      status: "inactive",
      email: "jane.smith@example.com",
      phone: "098-765-4321"
    },
    {
      id: "b12347",
      firstName: "Michael",
      lastName: "Brown",
      major: "Electrical Engineering",
      badgeNumber: 103,
      pledgeClass: "Gamma",
      status: "active",
      email: "michael.brown@example.com",
      phone: "555-555-5555"
    },
    {
      id: "b12348",
      firstName: "Emily",
      lastName: "Davis",
      major: "Chemical Engineering",
      badgeNumber: 104,
      pledgeClass: "Delta",
      status: "inactive",
      email: "emily.davis@example.com",
      phone: "444-444-4444"
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
