export interface JsonResponse<T> {
  status: string
  message: string
  data: T
}
