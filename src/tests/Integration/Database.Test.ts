import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { app } from '../../app';

chai.use(chaiHttp);
chai.use(sinonChai);


describe('Testes para o banco de dados', () => {
  it('Testa se retorna todos os projetos', async () => {
    const httpReq = await chai.request(app).get('/');

    console.log(httpReq.body);
  })
  it('Testa se é possivel adicionar um projeto', async () => { })
  it('Testa se retorna um erro caso não seja passado algum dos campos', async () => { })
  it('Testa se retorna uma mensagem de erro inesperado casso ocorra um erro durante a leitura/escrita do json', async () => { })
})