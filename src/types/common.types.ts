export type Nullable<T> = null | T;

export type Optional<T> = undefined | T;

export type NullableOptional<T> = Nullable<T> | Optional<T>;
