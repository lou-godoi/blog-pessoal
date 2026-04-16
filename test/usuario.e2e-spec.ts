import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { Usuario } from '../src/usuario/entities/usuario.entity';
import { Postagem } from '../src/postagem/entities/postagem.entity';
import { Tema } from '../src/tema/entities/tema.entity';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
  let token: string;
  let usuarioid: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          // 2. AQUI É O PASSO 2: Coloque as classes das entidades aqui!
          entities: [Usuario, Postagem, Tema], 
          synchronize: true,
          dropSchema: true
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

 
  // testes
  it("01 - Deve criar um novo usuário", async () => { // descrição do teste
      const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar').send({
          nome: "capivara",
          usuario: "capivara@gmail.com",
          senha: "capivara123",
          foto: "-"
      }).expect(201); // faz a requisição para o servidor nest

      // Guardamos o ID criado para usar no teste de atualizar lá na frente!
      usuarioid = resposta.body.id;
  });

  it("02 - Não Deve Cadastrar um Usuário Duplicado", async () => {
      // Primeiro cadastramos o Root uma vez
      await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
          nome: 'Root',
          usuario: 'root@root.com',
          senha: 'rootroot',
          foto: '-'
      });

      // Agora tentamos cadastrar de novo para forçar o erro 400
      return await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
          nome: 'Root',
          usuario: 'root@root.com',
          senha: 'rootroot',
          foto: '-'
      })
      .expect(400);
  });
      
  it("03 - Deve Autenticar o Usuário (Login)", async () => {
      const resposta = await request(app.getHttpServer())
      .post("/usuarios/logar").send({
          usuario: 'root@root.com',
          senha: 'rootroot'
      }).expect(200);
      
      // 1. GUARDE APENAS O TOKEN (sem a palavra Bearer aqui)
      token = resposta.body.token; 

  });

  it("04 - Deve Listar todos os Usuários", async () => {
      return request(app.getHttpServer())
      .get("/usuarios/all")
      .set('Authorization', token) // aqui é onde o token é realmente usado para autenticar a requisição
      .expect(200);
  });

  it("05 - Deve Atualizar um Usuário", async () => {
    return request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', token)
      .send({
        id: usuarioid, // Usamos o ID que salvamos no primeiro teste
        nome: 'Capivara Atualizada',
        usuario: 'capivara@gmail.com',
        senha: 'capivara123',
        foto: '-',
      })
      .expect(200)
      .then(resposta => {
        expect(resposta.body.nome).toEqual("Capivara Atualizada");
      });
  });

  afterAll(async () => { // configurações finais do teste que são executadas depois de todos os testes uma vez so no final
    await app.close(); // fecha a aplicação nest
  });
 
});