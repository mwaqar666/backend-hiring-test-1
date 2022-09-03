import { BaseEntity } from "@/base";

export type TEntityColumns<TEntity extends BaseEntity<TEntity>> = {
	[K in keyof TEntity]: TEntity[K];
};
