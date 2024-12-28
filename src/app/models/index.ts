export interface Trip {
  id: string
  title: string
  description: string
  price: number
  rating: number
  nrOfRatings: number
  verticalType: string
  tags: string[]
  co2: number
  thumbnailUrl: string
  imageUrl: string
  creationDate: Date
}

export interface TripsResponse {
  items: Trip[]
  limit: number
  page: number
  total: number
}

export type SortBy = 'title' | 'price' | 'rating' | 'createdAt'
export type SortOrder = 'ASC' | 'DESC'
