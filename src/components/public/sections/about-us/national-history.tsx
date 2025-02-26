import { getPayloadClient } from '@/payload/payload'

// This is a server component that fetches data from Payload CMS
export default async function NationalHistory() {
  // Default values in case CMS data is not available yet
  let nationalHistoryData = {
    title: 'National History',
    content: `
      <p>Theta Tau was originally founded as the Society of Hammer and Tongs on
      October 15, 1904 at the University of Minnesota in Minneapolis by four
      young engineering students Erich J. Schrader, Elwin L. Vinal, William M.
      Lewis, and Isaac B. Hanks. Erich Schrader felt that engineering deserved
      a prominent professional fraternity similar to those that existed for
      lawyers, physicians, and dentists. Schrader's service to the fraternity
      remains unmatched, having served as Grand Regent from 1904 to 1919,
      followed by 35 years as the Grand Scribe.</p>
      
      <p>Fifty years after its founding the Fraternity established the position
      of Counsellor to be held only by Erich Schrader at the Founders' Golden
      Anniversary Convention. He held this position until his death in 1962.
      The remaining founders remained interested in Theta Tau throughout their
      lives until the last brother, Vinal, died in 1971.</p>
      
      <p>Erich Schrader was chiefly responsible for the Ritual, Constitution, and
      the Bylaws adopted by the founders. The first badge was a gold skull
      with the letters Θ and Τ on its forehead and a crossed hammer and tongs
      beneath. Schrader's Constitution allowed for additional chapters at
      other engineering schools, with the hope that the organization would
      take on a national chapter.</p>
      
      <p>The oldest symbol of the fraternity still in use is the coat of arms,
      adopted in 1906, which may only be displayed or worn by members.</p>
      
      <p>Robert Downing, a friend of Isaac Hanks and student at Michigan College
      of Mines worked with Hanks to install the Beta chapter in 1906. In 1907,
      founder William Lewis transferred to the Colorado School of Mines and
      set up the Gamma Chapter in 1907. These three chapters held the first
      national conference in 1911, during which a new ritual was approved, the
      present badge adopted, and the name changed to Theta Tau. It was also
      decided that all branches of engineering would be included.</p>
      
      <p>Over the next several years, new chapters continued to be installed. The
      second conference was held in 2013 and designated The Gear of Theta Tau
      as the fraternity's magazine with Jack E. Haynes as its first
      editor-in-chief.</p>
      
      <p>Despite the toll wars took on numbers, the fraternity continued to grow
      for many years. This growth continued in 1977, when a decision from the
      1976 national conference was implemented granting women membership in
      the fraternity, with the Delta Chapter from Case Western Reserve being
      the first to implement.</p>
      
      <p>By the time Theta Tau celebrated its centennial in 2004, more than
      30,000 members had been initiated. More than 20 new chapters have been
      installed and many more colonies certified since 2010, a testament to
      Theta Tau's record growth in recent history.</p>
    `,
    footer: 'To view more information about the national organization of Theta Tau, please visit thetatau.org',
  }

  try {
    // Fetch the about us content from Payload CMS
    const client = await getPayloadClient()
    const response = await client.find({
      collection: 'about-us-content',
      limit: 1,
    })

    // If there's data, use it
    if (response.docs.length > 0 && response.docs[0].nationalHistory) {
      const aboutUsContent = response.docs[0]
      
      // Update the title if available
      if (aboutUsContent.nationalHistory.title) {
        nationalHistoryData.title = aboutUsContent.nationalHistory.title
      }

      // Update the content if available
      if (aboutUsContent.nationalHistory.content) {
        nationalHistoryData.content = aboutUsContent.nationalHistory.content
      }

      // Update the footer if available
      if (aboutUsContent.nationalHistory.footer) {
        nationalHistoryData.footer = aboutUsContent.nationalHistory.footer
      }
    }
  } catch (error) {
    // If there's an error, use the default values
    console.error('Error fetching national history data:', error)
  }

  // Function to render HTML content safely
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent }
  }

  return (
    <section className="m-2 md:pb-16 md:pt-12 md:px-32 md:m-8">
      <h2 className="text-primary m-4 text-xl md:text-5xl font-bold w-auto text-center">
        {nationalHistoryData.title}
      </h2>
      <div 
        className="text-foreground md:text-lg p-2 md:px-8 national-history-content"
        dangerouslySetInnerHTML={createMarkup(nationalHistoryData.content)}
      />
      <br /><br />
      <h4 className="text-center">{nationalHistoryData.footer}</h4>
    </section>
  )
}
