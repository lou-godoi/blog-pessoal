import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";

@Entity({name: "tb_postagens"}) // Cria uma tabela chamada tb_postagens
export class Postagem{

    @PrimaryGeneratedColumn() // Cria a chave primaria e auto increment
    id: number;

    @IsNotEmpty() // Verifica se o campo está vazio
    @Column({length: 100, nullable: false}) // Cria uma coluna com o nome titulo, com o tipo varchar(100) e não permite nulo
    titulo: string;

    @IsNotEmpty() 
    @Column({length: 1000, nullable: false}) // Cria uma coluna com o nome texto, com o tipo varchar(1000) e não permite nulo
    texto: string;

    @UpdateDateColumn() // cria uma coluna chamada data atualização da postagem, com o tipo timestamp e atualiza automaticamente a data quando a postagem for atualizada
    data: Date;

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema // Cria um relacionamento muitos para um com a tabela tema, onde uma postagem pode ter um tema e um tema pode ter muitas postagens, e carrega o tema automaticamente quando a postagem for carregada

}