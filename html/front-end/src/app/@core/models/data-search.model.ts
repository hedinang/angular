export class DataSearchResponse {
  list: any[];
  page: number;
  total: number;
  limit: number;
}

export class DataSearchRequest {
  page: number;
  limit: number;
  constructor(page?: number, limit?: number) {
    if (page !== undefined && page !== null) {
      this.page = page;
    }
    if (limit !== undefined && limit !== null) {
      this.limit = limit;
    }
  }
}
