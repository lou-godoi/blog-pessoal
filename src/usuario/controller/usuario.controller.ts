import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../../auth/services/auth.service';
import { UsuarioLogin } from '../../auth/entities/usuariologin.entity';

@Controller('/usuarios')
export class UsuarioController {
    constructor(
        private usuarioService: UsuarioService,
        private authService: AuthService
    ) { }

    @UseGuards(JwtAuthGuard) // Protegida! Precisa de Token.
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }

    @Post('/cadastrar') // Pública
    @HttpCode(HttpStatus.CREATED)
    create(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.create(usuario);
    }

    @Post('/logar') // Pública - É aqui que você pega o Token
    @HttpCode(HttpStatus.OK)
    login(@Body() usuarioLogin: UsuarioLogin): Promise<any> {
        return this.authService.login(usuarioLogin);
    }

    @UseGuards(JwtAuthGuard) // Protegida!
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    update(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(usuario);
    }
}