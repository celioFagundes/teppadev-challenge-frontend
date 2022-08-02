export interface IAdditionalInfo {
  name: string
  value: string
}
export interface IMedia {
  id: string
  name: string
  media_type: string
  genre: string
  status: string
  additional: IAdditionalInfo[]
}
export interface IMediaInput {
  name: string
  media_type: string
  genre: string
  status: string
  additional: IAdditionalInfo[]
}
