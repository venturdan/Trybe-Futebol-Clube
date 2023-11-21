import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { Response } from 'superagent';
import { teamsMock, teamMock } from './mocks/team.mocks';

chai.use(chaiHttp);
const { expect } = chai;

describe('Teams ', function () {
    it('rota /teams', async function () {
      sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMock as any);
  
      const { status, body } = await chai.request(app).get('/teams');
  
      expect(status).to.be.eq(200);
      expect(body).to.deep.equal(teamsMock);
    });

    it('rota /teams/:id', async function () {
      sinon.stub(SequelizeTeam, 'findByPk').resolves(teamMock as any);
      const { status, body } = await chai.request(app).get('/teams/1`');
    
      expect(status).to.be.eq(200);
      expect(body).to.deep.includes(teamMock);
    });
  });