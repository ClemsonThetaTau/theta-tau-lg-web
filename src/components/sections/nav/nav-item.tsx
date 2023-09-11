import React from 'react'

interface NavItemProps {
  href: string
  children: React.ReactNode
}

const NavItem: React.FC<NavItemProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="block mt-4 lg:inline-block hover:text-accent-foreground transition-colors lg:mt-0 mr-4"
    >
      {children}
    </a>
  )
}

export { NavItem }
