import { BaseController } from "@/base";
import { IncomingCallDto, MainMenuSelectionDto, VoicemailSavedDto } from "@/modules/ivr-module/dto";
import { UpdateCallStatusDto } from "@/modules/ivr-module/dto/update-call-status.dto";
import { CallEntity } from "@/modules/ivr-module/entities";
import { IvrRoutes } from "@/modules/ivr-module/routes";
import { CallService } from "@/modules/ivr-module/services";
import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller()
export class IncomingCallController extends BaseController<IncomingCallController> {
	public constructor(private callService: CallService) {
		super();
	}

	@Post(IvrRoutes.MainMenu)
	public async handleIncomingCall(@Body() incomingCallDto: IncomingCallDto): Promise<string> {
		return this.callService.handleIncomingCall(incomingCallDto).toString();
	}

	@Post(IvrRoutes.MainMenuSelection)
	public async handleMainMenuSelection(@Body() mainMenuSelectionDto: MainMenuSelectionDto): Promise<string> {
		return this.callService.handleMainMenuSelection(mainMenuSelectionDto).toString();
	}

	@Post(IvrRoutes.HangUpCall)
	public async hangUpCall(): Promise<string> {
		return this.callService.hangupCall().toString();
	}

	@Post(IvrRoutes.UpdateCallStatus)
	public async updateCallStatus(@Body() updateCallStatus: UpdateCallStatusDto): Promise<CallEntity> {
		return this.callService.updateCallStatus(updateCallStatus);
	}

	@Post(IvrRoutes.VoiceMailRecordingSaved)
	public async voiceMailRecordingAvailable(@Body() voicemailSavedDto: VoicemailSavedDto): Promise<CallEntity> {
		return this.callService.saveVoiceMailRecording(voicemailSavedDto);
	}

	@Get(IvrRoutes.CallList)
	public async callList(): Promise<CallEntity[]> {
		return await this.callService.callList();
	}
}
