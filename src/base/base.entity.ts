import { BaseEntity as TypeOrmBaseEntity } from "typeorm";

export class BaseEntity<TEntity extends BaseEntity<TEntity>> extends TypeOrmBaseEntity {}
