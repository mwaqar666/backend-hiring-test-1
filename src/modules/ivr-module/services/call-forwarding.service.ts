import { BaseService } from "@/base";
import { CommonSayAttributes } from "@/modules/ivr-module/config";
import { CallConstants, PersonalNumber } from "@/modules/ivr-module/constants";
import { IvrRoutes } from "@/modules/ivr-module/routes";
import { Injectable } from "@nestjs/common";
import { twiml } from "twilio";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

@Injectable()
export class CallForwardingService extends BaseService<CallForwardingService> {
	public forwardCallToPersonalCell(): VoiceResponse {
		const voiceResponse = new twiml.VoiceResponse();

		voiceResponse.say(CommonSayAttributes, CallConstants.callingSalesRepresentativeMessage);
		voiceResponse.dial({ action: IvrRoutes.HangUpCall }, PersonalNumber);

		return voiceResponse;
	}
}
