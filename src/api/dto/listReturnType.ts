export interface ListReturnType<T> {
  data: T[]
  status?: number;
}

export interface ItemReturnType<T> {
  data: T
  status?: number;
}
