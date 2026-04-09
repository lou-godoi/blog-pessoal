import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.modules';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';

@Module({ // configuração do modulo nestjs, onde são importados os módulos, controladores e provedores
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // type of database
      host: 'localhost', // host of the database
      port: 3306, // port of the database
      username: 'root', // username of the database
      password: 'root', // password of the database
      database: 'db_blogpessoal', // name of the database
      entities: [Postagem, Tema, Usuario], // entities of the database
      synchronize: true
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
