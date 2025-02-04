
export interface PaginateResDto<T> {

  data: T[],
  page: number,
  pageSize: number,
  total: number,
  totalPages: number
}