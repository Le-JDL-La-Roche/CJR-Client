export interface Event {
  id?: number
  title: string
  content: string
  fromDate: string
  toDate?: string
  field: number // 0-4 (0 => category g & toDate null)
  category: 'C' | 'L' | 'g' // Collège | Lycée | Général
  status: 0 | 1 // Privé | Public
  match?: boolean
}
