import { Inject, Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { Postagem } from "../entities/postagem.entity"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem> // Injeção de dependência do repositório de postagem, para acessar o banco de dados
        ){}

         async findAll(): Promise<Postagem[]>{
        return await this.postagemRepository.find(); // select * from tb_postagem;
    }




}