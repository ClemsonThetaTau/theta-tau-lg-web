interface PublicBrother {
  firstName: string
  lastName: string
  displayEmail: string
  major: string
  profilePicture: string
}

interface PublicBrotherData {
  brotherList: { [key: string]: PublicBrother }
  displayOrder: string[]
}

interface PublicOfficerData {
  chairs: { posName: string, userId: string }[]
  ec: {regent: string, viceRegent: string, scribe: string, treasurer: string, correspondingSecretary: string, delegateAtLarge: string, newMemberEducator: string}
}

export type { PublicBrother, PublicBrotherData, PublicOfficerData }
