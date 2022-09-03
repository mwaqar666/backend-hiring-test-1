import { BaseTwilioRequestDto } from "@/modules/ivr-module/base";
import { RecordingStatusType } from "@/modules/ivr-module/types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class VoicemailSavedDto extends BaseTwilioRequestDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	public RecordingSid: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	public RecordingUrl: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	public RecordingStatus: RecordingStatusType;
}
