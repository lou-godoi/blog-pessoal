import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) { }

    async validateUser(username: string, password: string): Promise<any> {

        const buscaUsuario = await this.usuarioService.findByUsuario(username)

        if (!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.compararSenhas(password, buscaUsuario.senha)

        if (buscaUsuario && matchPassword) {
            const { senha, ...resposta } = buscaUsuario
            return resposta
        }

        return null

    }

    async login(usuarioLogin: UsuarioLogin) {

        // 1. Busca o usuário no banco pelo e-mail
        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario)

        // 2. Se não achar o usuário, já barra
        if (!buscaUsuario)
            throw new HttpException('Usuário e/ou senha inválidos!', HttpStatus.UNAUTHORIZED)

        // 3. confere se a senha digitada bate com a do banco
        const matchPassword = await this.bcrypt.compararSenhas(usuarioLogin.senha, buscaUsuario.senha)

        // 4. Se a senha for diferente (false), barra também
        if (!matchPassword)
            throw new HttpException('Usuário e/ou senha inválidos!', HttpStatus.UNAUTHORIZED)

        // 5. Se passar por tudo, gera o token de acesso
        const payload = { sub: usuarioLogin.usuario }

        return {
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: usuarioLogin.usuario,
            senha: '',
            foto: buscaUsuario.foto,
            token: this.jwtService.sign(payload)
        }
    }

}