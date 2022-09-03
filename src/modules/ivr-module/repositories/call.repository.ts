import { BaseRepository } from "@/base";
import { IncomingCallDto, VoicemailSavedDto } from "@/modules/ivr-module/dto";
import { CallEntity } from "@/modules/ivr-module/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class CallRepository extends BaseRepository<CallRepository, CallEntity> {
	public constructor(@InjectRepository(CallEntity) protected callRepository: Repository<CallEntity>, protected dataSource: DataSource) {
		super(callRepository, dataSource);
	}

	public async createIncomingCallRecord(incomingCallRecord: IncomingCallDto): Promise<CallEntity> {
		return this.callRepository
			.create({
				callSid: incomingCallRecord.CallSid,
				callAccountSid: incomingCallRecord.AccountSid,
				callStatus: incomingCallRecord.CallStatus,
			})
			.save();
	}

	public async updateCallStatus(callSid: string, callStatus: string) {
		const callEntity = await this.callRepository.findOneByOrFail({ callSid });

		callEntity.callStatus = callStatus;

		return callEntity.save();
	}

	public async saveVoiceMailRecording(voicemailSavedDto: VoicemailSavedDto): Promise<CallEntity> {
		const callEntity = await this.callRepository.findOneByOrFail({ callSid: voicemailSavedDto.CallSid });

		callEntity.callVoicemailUrl = voicemailSavedDto.RecordingUrl;

		return callEntity.save();
	}

	public async callList(): Promise<CallEntity[]> {
		return this.callRepository.find();
	}
}
