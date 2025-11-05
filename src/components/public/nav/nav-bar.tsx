import NavBarContent from './nav-bar-content'

// Server component to fetch navigation items
async function getNavItems() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/pages?where[status][equals]=published&where[showInNav][equals]=true&limit=100`,
      {
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      }
    )

    if (!res.ok) {
      // Return default nav items if fetch fails
      return getDefaultNavItems()
    }

    const data = await res.json()
    
    if (!data.docs || data.docs.length === 0) {
      return getDefaultNavItems()
    }

    // Sort by navOrder (or default to order they come in)
    const sortedPages = data.docs.sort((a: any, b: any) => {
      const orderA = a.navOrder || 999
      const orderB = b.navOrder || 999
      return orderA - orderB
    })

    // Map to nav items
    const navItems = sortedPages.map((page: any) => ({
      label: page.navLabel || page.title,
      href: `/${page.slug}`,
    }))

    // Always add home at the beginning if not already there
    const hasHome = navItems.some((item: any) => item.href === '/')
    if (!hasHome) {
      navItems.unshift({ label: 'Home', href: '/' })
    }

    return navItems
  } catch (error) {
    console.error('Error fetching nav items:', error)
    return getDefaultNavItems()
  }
}

function getDefaultNavItems() {
  return [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Officers & Chairs', href: '/officers-chairs' },
    { label: 'Brothers', href: '/brothers' },
  ]
}

export default async function NavBar() {
  const navItems = await getNavItems()

  return <NavBarContent navItems={navItems} />
}
