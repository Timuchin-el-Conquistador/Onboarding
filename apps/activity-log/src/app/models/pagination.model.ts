export interface IPaginatedResponse<T> {
  items: T[];
  total: number;
}

export interface IPaginationValue {
  page: number;
  pageSize: number;
}
