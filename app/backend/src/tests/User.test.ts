import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { Response } from 'superagent';
import { userMock, validLogin, loginWithouEmail, loginWithouPassword, validToken } from './mocks/user.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Users', () => {
    it('sucessfull login', async () => {
      sinon.stub(SequelizeUser, 'findOne').resolves(validLogin as any);

      const { status, body } = await chai.request(app).post('/login').send(userMock);

      expect(status).to.equal(200);
      expect(body).to.have.property('token');
    });

    it('checks if error from incomplete info', async () => {
      const { status, body } = await chai.request(app).post('/login').send(loginWithouEmail);

      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('error no password', async () => {
      const { status, body } = await chai.request(app).post('/login').send(loginWithouPassword);

      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('pass/email invalid', async () => {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);
  
      const { status, body } = await chai.request(app).post('/login').send(validLogin);
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Invalid email or password' });
    });

    it('return correct infos', async () => {
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock as any);
  
      const { status, body } = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${validToken}`);
  
      expect(status).to.equal(200);
      expect(body).to.have.key('role');
      expect(body.role).to.equal(userMock.role);
    });

    it('Invalid Token', async () => {
      const { status, body } = await chai.request(app).get('/login/role').set('Authorization', `Bearer invalid_token`);
  
      expect(status).to.equal(401);
      expect(body).not.to.have.key('role');
      expect(body).to.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Token not Found', async () => {
      const { status, body } = await chai.request(app).get('/login/role');
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Token not found' });
    });

    afterEach(() => {
      sinon.restore();
    });
});
