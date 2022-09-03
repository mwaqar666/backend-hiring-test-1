import { BaseModule } from "@/base";
import { ConfigModule } from "@/modules/config-module/config.module";
import { TypeOrmConfig } from "@/modules/db-module/config";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [ConfigModule, TypeOrmModule.forRoot(TypeOrmConfig)],
})
export class DbModule extends BaseModule<DbModule> {}
