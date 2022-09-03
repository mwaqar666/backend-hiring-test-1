import { BaseTwilioRequestDto } from "@/modules/ivr-module/base";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class MainMenuSelectionDto extends BaseTwilioRequestDto {
	@ApiProperty()
	@IsNumberString()
	@IsNotEmpty()
	public Digits: string;
}
