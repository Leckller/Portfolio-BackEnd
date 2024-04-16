import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { app } from '../../src/app';
import { TecnologiaType } from '../../src/types';

chai.use(chaiHttp);
chai.use(sinonChai);

const key = process.env.SUPER_SECRET_PASSWORD_OMG;

describe('Testes para o banco de dados - TECNOLOGIES', () => {
  beforeEach(() => sinon.restore());

  it('Testa se é possivel requisitar todas as tecnologias', async () => {
    const req = await chai.request(app).get('/tec').set({ authorization: key });

    expect(req.body.data).to.has.an('array');
    for (const project in req.body.data) {
      expect(req.body.data[project]).to.have.property('title');
      expect(req.body.data[project]).to.have.property('type');
      expect(req.body.data[project]).to.have.property('img');
    }
  });

  it('Testa se é possivel adicionar uma tecnologia', async () => {
    const req = await chai.request(app)
      .post('/tec')
      .send({ title: "xesque", type: "dele", img: "titanzada.png" })
      .set({ authorization: key });

    const newTecExists = req.body.data.find((tec: TecnologiaType) => tec.title === "xesque");

    expect(newTecExists).to.deep.eq({ title: "xesque", type: "dele", img: "titanzada.png" });
  });

  it('Testa se é possivel editar uma tecnologia', async () => {
    const req = await chai.request(app)
      .patch('/tec')
      .send({ title: "xesque", fields: ["title", "type"], values: ["xsqdl", "titanzada"] })
      .set({ authorization: key });

    expect(req.body.data).to.deep.eq({ title: "xsqdl", type: "titanzada", img: "titanzada.png" });

  });

  it('Testa se é possivel deletar uma tecnologia', async () => {
    const req = await chai.request(app)
      .delete('/tec')
      .send({ title: "xsqdl" })
      .set({ authorization: key });

    const newTecExists = req.body.data.some((tec: TecnologiaType) => tec.title === "xesque");

    expect(newTecExists).to.eq(false);
  });

  it('Testa se retorna um erro caso seja passado mais campos do que valores', async () => {
    const req = await chai.request(app)
      .patch('/tec')
      .send({ title: "xesque", fields: ["title", "type"], values: ["xsqdl", "pain", "dynkas", "titanzada"] })
      .set({ authorization: key });

    expect(req.body.data.message).to.be.eq('Foi enviado valores ou campos a mais');
  });
})