import { BaseModule } from "@/base";
import { ConfigModuleConfig } from "@/modules/config-module/config";
import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";

@Module({
	imports: [NestConfigModule.forRoot(ConfigModuleConfig)],
})
export class ConfigModule extends BaseModule<ConfigModule> {}
