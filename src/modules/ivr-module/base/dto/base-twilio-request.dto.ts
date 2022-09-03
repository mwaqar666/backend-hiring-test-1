import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class BaseTwilioRequestDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	public CallSid: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	public AccountSid: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	public CallStatus: string;
}
