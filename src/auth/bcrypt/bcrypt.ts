import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {

    async criptografarSenha(senha: string): Promise<string> {

        let saltos: number = 10; // Define o número de saltos para a criptografia da senha, quanto maior o número de saltos, mais segura é a senha, mas também leva mais tempo para criptografar
        // Implementação da criptografia da senha (exemplo com bcrypt)
        // const hashedPassword = await bcrypt.hash(senha, saltos);
        // return hashedPassword;
        return await bcrypt.hash(senha, saltos);
    }

    async compararSenhas(senhaDigitada: string, senhabanco: string): Promise<boolean> {
        return await bcrypt.compare(senhaDigitada, senhabanco);
    }
}