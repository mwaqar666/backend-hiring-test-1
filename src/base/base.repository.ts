import { BaseEntity } from "@/base/base.entity";
import { DataSource, Repository } from "typeorm";

export class BaseRepository<TRepository extends BaseRepository<TRepository, TEntity>, TEntity extends BaseEntity<TEntity>> {
	protected constructor(protected entityRepository: Repository<TEntity>, protected dataSource: DataSource) {}
}
