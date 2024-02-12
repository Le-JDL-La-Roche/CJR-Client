export interface Team {
  id?: number
  name: string
  school: number
  teammates: Teammate[]
}

export interface Teammate {
  name: string
  captain: boolean
  substitute: boolean
  imageId: string
}
