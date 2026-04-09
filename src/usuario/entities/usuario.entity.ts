import { Module } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
 
@Module({

    imports: [],
    providers: [bcrypt],
    controllers: [],
    exports: [bcrypt],

})

export class AuthModule {};
 
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "../../postagem/entities/postagem.entity"
 
@Entity({name: "tb_usuarios"})

export class Usuario {
 
    @PrimaryGeneratedColumn() 
    id!: number
    
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    nome!: string

    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    usuario!: string
 
    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    senha!: string // se a senha aceita numero e letras, seria string ou number? seria string, porque a senha pode conter letras e numeros, e o tipo string aceita ambos os tipos de caracteres. // mas então, podemos definir numero = string? seria melhor definir numero = string, porque a senha pode conter letras e numeros, e o tipo string aceita ambos os tipos de caracteres, e o tipo number não aceita letras, então seria melhor definir numero = string para evitar problemas com a senha.
 
    @Column({length: 5000 }) 
    foto!: string
 
    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem!: Postagem[]
 
}
 