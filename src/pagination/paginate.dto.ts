
export class PaginationDto {

  page: number;
  pageSize: number;

  constructor(page: number = 1, pageSize: number = 1) {
    this.page = page;
    this.pageSize= pageSize;
  }
}