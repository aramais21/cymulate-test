export interface IRequestResponseDto<T> {
  isSuccess: boolean
  errorConfig?: {
    isTimeout: boolean
    status: number
    data: any
  }
  data?: T
}
