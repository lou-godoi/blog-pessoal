import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_usuarios" })
export class Usuario {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id!: number;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    nome!: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false, unique: true })
    @ApiProperty()
    usuario!: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    senha!: string;

    @Column({ length: 5000 })
    @ApiProperty()
    foto!: string;

    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    @ApiProperty({ type: () => Postagem })
    postagem!: Postagem[]; 

}