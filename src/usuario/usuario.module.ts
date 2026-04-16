import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controller/usuario.controller';
import { AuthModule } from '../auth/auth.module';
import { Bcrypt } from '../auth/bcrypt/bcrypt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    // O forwardRef resolve o problema de um módulo chamar o outro
    forwardRef(() => AuthModule) 
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, Bcrypt],
  exports: [UsuarioService],
})
export class UsuarioModule {}