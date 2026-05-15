import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthService } from './services/auth.service';
import { Bcrypt } from './bcrypt/bcrypt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { jwtConstants } from './constants/constants';

@Module({
  imports: [
    forwardRef(() => UsuarioModule),
    PassportModule,

JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '1h' },
}),
  ],
  providers: [AuthService, Bcrypt, JwtStrategy],
  exports: [AuthService, JwtModule], // Importante exportar o AuthService
})
export class AuthModule {}