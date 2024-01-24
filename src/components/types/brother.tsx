interface Brother {
  name: string
  email: string
  image: string
  major: string
}

interface PublicBrother {
  firstName: string
  lastName: string
  displayEmail: string
  major: string
  profilePicture: string
}

interface PublicData {
  brotherList: { [key: string]: PublicBrother }
  displayOrder: string[]
}

export type { Brother, PublicBrother, PublicData }
