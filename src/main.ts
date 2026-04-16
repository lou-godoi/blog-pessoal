import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // configuração da aplicação nest, cria a aplicação
  
  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Generation Brasil","http://www.generationbrasil.online","generation@email.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00'; // configuração do timezone para o horário de Brasília

  app.useGlobalPipes(new ValidationPipe()); // configuração de validação de dados de entrada

  app.enableCors(); // configuração de cors para permitir requisições de outras origens

  await app.listen(process.env.PORT ?? 4000); // configuração da porta para a aplicação
}
bootstrap(); // execução da aplicação nest, configuração da porta
