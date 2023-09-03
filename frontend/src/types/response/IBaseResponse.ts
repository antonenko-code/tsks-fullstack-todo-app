export interface IBaseResponse<T, E> {
  success: boolean,
  message: string,
  data?: T,
  errors?: E,
}

