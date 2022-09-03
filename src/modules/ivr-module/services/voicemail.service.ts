import { BaseService } from "@/base";
import { CommonSayAttributes } from "@/modules/ivr-module/config";
import { CallConstants } from "@/modules/ivr-module/constants";
import { IvrRoutes } from "@/modules/ivr-module/routes";
import { Injectable } from "@nestjs/common";
import { twiml } from "twilio";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

@Injectable()
export class VoicemailService extends BaseService<VoicemailService> {
	public recordVoiceMail(): VoiceResponse {
		const voiceResponse = new twiml.VoiceResponse();

		voiceResponse.say(CommonSayAttributes, CallConstants.recordingVoiceMailMessage);
		voiceResponse.record({
			playBeep: true,
			action: IvrRoutes.HangUpCall,
			maxLength: 60,
			finishOnKey: "*",
			recordingStatusCallback: IvrRoutes.VoiceMailRecordingSaved,
		});

		return voiceResponse;
	}
}
