import { BaseModule } from "@/base";
import { DbModule, IvrModule } from "@/modules";
import { Module } from "@nestjs/common";

@Module({
	imports: [DbModule, IvrModule],
})
export class AppModule extends BaseModule<AppModule> {}
