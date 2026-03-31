import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controller/postagem.controller";
 
@Module({
    imports: [TypeOrmModule.forFeature([Postagem])], // Importa o Postagem como uma entidade do TypeOrm, para acessar o banco de dados
    providers: [PostagemService], // Define o PostagemService como um provedor, para ser injetado em outros lugares da aplicação
    controllers: [PostagemController],
    exports: [TypeOrmModule] // Exporta o TypeOrmModule, para ser importado em outros módulos da aplicação
})
export class PostagemModule {}