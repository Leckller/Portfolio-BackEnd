import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { app } from '../../src/app';
import fs from 'fs/promises';
import DatabaseMock from '../mocks/Database.Mock';
import { ProjetosType } from '../../src/types';

chai.use(chaiHttp);
chai.use(sinonChai);

const mock = new DatabaseMock();

const key = process.env.SUPER_SECRET_PASSWORD_OMG;

describe('Testes para o banco de dados', () => {
  beforeEach(() => sinon.restore());

  it('Testa se retorna todos os projetos', async () => {
    const httpReq = await chai.request(app).get('/').set({ authorization: key });

    expect(httpReq.body.data).to.has.an('array');
    for (const project in httpReq.body.data) {
      expect(httpReq.body.data[project]).to.have.property('title');
      expect(httpReq.body.data[project]).to.have.property('url');
      expect(httpReq.body.data[project]).to.have.property('describe');
      expect(httpReq.body.data[project]).to.have.property('tecnologias');
      expect(httpReq.body.data[project]).to.have.property('gitHub');
    }
  });

  it('Testa se é possivel adicionar um projeto', async () => {
    const httpReq = await chai.request(app)
      .post('/').set({ authorization: key }).send(mock.validProject());

    expect(httpReq.status).to.be.eq(201);
    const newTecExists = httpReq.body.data.find((tec: ProjetosType) => tec.title === mock.validProject().title);
    expect(newTecExists).to.deep.eq(mock.validProject());
  });

  it('Testa se não é possivel adicionar um projeto caso ele já esteja armazenado', async () => {
    const httpReq = await chai.request(app)
      .post('/').set({ authorization: key }).send(mock.validProject());

    expect(httpReq.status).to.be.eq(400);
    expect(httpReq.body).to.deep.eq({ data: { message: 'Este projeto já está armazenado' } });
  })

  it('Testa se retorna um erro caso não seja passado algum dos campos', async () => {
    const httpReq = await chai.request(app)
      .post('/').set({ authorization: key }).send(mock.invalidProject());

    expect(httpReq.status).to.be.eq(400);
    expect(httpReq.body).to.deep.eq({ data: { message: 'Preencha todos os campos' } });
  });

  it('Testa se retorna um status 200 caso consiga deletar algum projeto', async () => {
    const httpReq = await chai.request(app).delete('/').set({ authorization: key }).send(mock.validProject());

    const newTecExists = httpReq.body.data.some((tec: ProjetosType) => tec.title === mock.validProject().title);

    expect(newTecExists).to.eq(false);
    expect(httpReq.status).to.be.eq(200);
  });

  it('Testa se retorna um status 404 caso não consigo encontrar algum projeto', async () => {
    const httpReq = await chai.request(app).delete('/').set({ authorization: key }).send(mock.validProject());


    expect(httpReq.status).to.be.eq(404);
    expect(httpReq.body).to.deep.eq({ data: { message: 'Projeto não encontrado' } });

  });

  it('Testa se retorna uma mensagem de erro inesperado caso ocorra um erro durante a escrita do json', async () => {
    sinon.stub(fs, 'writeFile').rejects(new Error());

    const httpReqREAD = await chai.request(app).post('/').set({ authorization: key }).send(mock.validProject());

    expect(httpReqREAD.status).to.be.eq(500);
    expect(httpReqREAD.body).to.deep.eq({ data: { message: 'Ocorreu um erro inesperado' } });
  })

  it('Testa se retorna uma mensagem de erro inesperado caso ocorra um erro durante a leitura do json', async () => {
    sinon.stub(fs, 'readFile').rejects(new Error());

    const httpReqWRITE = await chai.request(app).delete('/').set({ authorization: key }).send(mock.validProject());

    expect(httpReqWRITE.status).to.be.eq(500);
    expect(httpReqWRITE.body).to.deep.eq({ data: { message: 'Ocorreu um erro inesperado' } });
  });

  it('Testa se não é possivel fazer uma requisição sem authorização', async () => {
    const httpReq = await chai.request(app).get('/');
    expect(httpReq.status).to.be.eq(401);
    expect(httpReq.body).to.deep.eq({ message: 'Não autorizado.' });
  });
})