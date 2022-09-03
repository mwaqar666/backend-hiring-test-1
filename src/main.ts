import { AppModule } from "@/app-module/app.module";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder().setTitle("Twilio IVR").setDescription("IVR system made using Twilio APIs").setVersion("1.0").build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	await app.listen(3000);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
