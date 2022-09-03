import { BaseModule } from "@/base";
import { IncomingCallController } from "@/modules/ivr-module/controllers";
import { CallEntity } from "@/modules/ivr-module/entities";
import { CallRepository } from "@/modules/ivr-module/repositories";
import { CallForwardingService, CallService, VoicemailService } from "@/modules/ivr-module/services";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([CallEntity])],
	controllers: [IncomingCallController],
	providers: [CallForwardingService, VoicemailService, CallService, CallRepository],
	exports: [TypeOrmModule],
})
export class IvrModule extends BaseModule<IvrModule> {}
