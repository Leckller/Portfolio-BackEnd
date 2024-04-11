import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { app } from '../../src/app';

chai.use(chaiHttp);
chai.use(sinonChai);

const key = process.env.SUPER_SECRET_PASSWORD_OMG;

describe('Testes para o banco de dados', () => {
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

  it('Testa se é possivel adicionar um projeto', async () => { })
  it('Testa se retorna um erro caso não seja passado algum dos campos', async () => { })
  it('Testa se retorna uma mensagem de erro inesperado casso ocorra um erro durante a leitura/escrita do json', async () => { })
})