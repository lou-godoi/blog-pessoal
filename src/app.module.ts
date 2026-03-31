import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.modules';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // type of database
      host: 'localhost', // host of the database
      port: 3306, // port of the database
      username: 'root', // username of the database
      password: 'root', // password of the database
      database: 'db_blogpessoal', // name of the database
      entities: [Postagem],
      synchronize: true
    }),
    PostagemModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
