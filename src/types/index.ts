export type item = {
  isActive: boolean;
}

export interface DateFn<T> {
  (year: T, month: T): T;
}

export type Action = {
  type: string;
}
