export type ImmobileType = {
  id?: string
  name?: string
  code: string
  address: string
  type: string
  price: string
  size: string
  rooms: number
  bathrooms: number
  condominiumFee: string
  garage: number
  referencePoint: string
  description: string
  additionals?: string[]
  photosId: string[]
}
