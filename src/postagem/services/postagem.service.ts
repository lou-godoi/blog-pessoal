import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common"
import { DeleteResult, ILike, Repository } from "typeorm"
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
    async findById(id: number): Promise<Postagem> {

    const postagem = await this.postagemRepository.findOne({
        where: {
            id
        }
    });

    if (!postagem)
        throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return postagem;
}
async findAllByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
        where: {
            titulo: ILike(`%${titulo}%`)
        }
    });
}
async create(postagem: Postagem): Promise<Postagem> {
    return await this.postagemRepository.save(postagem); // insert into tb_postagem (titulo, texto, data) values (postagem.titulo, postagem.texto, postagem.data);
}
async update(postagem: Postagem): Promise<Postagem> {
    await this.findById(postagem.id); // Verifica se a postagem existe, para evitar erros de atualização
    return await this.postagemRepository.save(postagem); // update tb_postagem set titulo = postagem.titulo, texto = postagem.texto, data = postagem.data where id = postagem.id;
}
async delete(id: number): Promise<DeleteResult>{
    await this.findById(id); // Verifica se a postagem existe, para evitar erros de exclusão
    return await this.postagemRepository.delete(id); // delete from tb_postagem where id = id;
}
}
