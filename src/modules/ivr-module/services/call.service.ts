import { BaseService } from "@/base";
import { CommonSayAttributes } from "@/modules/ivr-module/config";
import { CallConstants } from "@/modules/ivr-module/constants";
import { MainMenuSelectionDto, VoicemailSavedDto } from "@/modules/ivr-module/dto";
import { IncomingCallDto } from "@/modules/ivr-module/dto/incoming-call.dto";
import { UpdateCallStatusDto } from "@/modules/ivr-module/dto/update-call-status.dto";
import { CallEntity } from "@/modules/ivr-module/entities";
import { CallRepository } from "@/modules/ivr-module/repositories";
import { IvrRoutes } from "@/modules/ivr-module/routes";
import { CallForwardingService } from "@/modules/ivr-module/services/call-forwarding.service";
import { VoicemailService } from "@/modules/ivr-module/services/voicemail.service";
import { Injectable } from "@nestjs/common";
import { twiml } from "twilio";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

@Injectable()
export class CallService extends BaseService<CallService> {
	public constructor(private voicemailService: VoicemailService, private callForwardingService: CallForwardingService, private callRepository: CallRepository) {
		super();
	}

	public async handleIncomingCall(incomingCallDto: IncomingCallDto): Promise<VoiceResponse> {
		const voiceResponse = new twiml.VoiceResponse();

		await this.callRepository.createIncomingCallRecord(incomingCallDto);

		const gather = voiceResponse.gather({
			action: IvrRoutes.MainMenuSelection,
			numDigits: 1,
			method: "POST",
		});

		gather.say(CommonSayAttributes, CallConstants.welcomeMessage);

		return voiceResponse;
	}

	public async handleMainMenuSelection(mainMenuSelectionDto: MainMenuSelectionDto): Promise<VoiceResponse> {
		await this.callRepository.updateCallStatus(mainMenuSelectionDto.CallSid, mainMenuSelectionDto.CallStatus);

		if (mainMenuSelectionDto.Digits === "1") {
			return this.callForwardingService.forwardCallToPersonalCell();
		}

		if (mainMenuSelectionDto.Digits === "2") {
			return this.voicemailService.recordVoiceMail();
		}

		return await this.replayMainMenu();
	}

	public async hangupCall(): Promise<VoiceResponse> {
		const voiceResponse = new twiml.VoiceResponse();

		voiceResponse.say(CommonSayAttributes, CallConstants.hangupMessage);
		voiceResponse.hangup();

		return voiceResponse;
	}

	public async saveVoiceMailRecording(voicemailSavedDto: VoicemailSavedDto): Promise<CallEntity> {
		await this.callRepository.updateCallStatus(voicemailSavedDto.CallSid, voicemailSavedDto.CallStatus);

		return this.callRepository.saveVoiceMailRecording(voicemailSavedDto);
	}

	public async updateCallStatus(updateCallStatus: UpdateCallStatusDto): Promise<CallEntity> {
		return await this.callRepository.updateCallStatus(updateCallStatus.CallSid, updateCallStatus.CallStatus);
	}

	public async callList(): Promise<CallEntity[]> {
		return await this.callRepository.callList();
	}

	private async replayMainMenu() {
		const voiceResponse = new twiml.VoiceResponse();

		const gather = voiceResponse.gather({
			action: IvrRoutes.MainMenuSelection,
			numDigits: 1,
			method: "POST",
		});

		gather.say(CommonSayAttributes, CallConstants.replayMainMenuMessage);

		return voiceResponse;
	}
}
