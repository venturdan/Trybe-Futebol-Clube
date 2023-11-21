import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { Response } from 'superagent';
import { matchesMock, createMatch, returnCreateMatch } from './mocks/match.mock';
import { validToken } from './mocks/user.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Matches', () => {
  it('Return match', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock as any);
    const { status, body } = await chai.request(app).get('/matches');
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMock);
  });

  it('In progress games', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock as any);
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMock);
  });

  it('Finishes games by id', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock as any);
     const { status, body } = await chai.request(app).patch('/matches/41/finish').set('Authorization', `Bearer ${validToken}`);
  
    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  });

  it('Goals Updates', async () => {
    const { status, body } = await chai.request(app).patch(`/matches/1`).set('Authorization', `Bearer ${validToken}`)
      .send({ homeTeamGoals: 2, awayTeamGoals: 1 });

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Update' });
  });

  it('New Game', async function () {
    sinon.stub(SequelizeMatch, 'create').resolves(returnCreateMatch as any);
  
    const { status, body } = await chai.request(app).post('/matches').set('Authorization', `Bearer ${validToken}`)
      .send(createMatch);
  
    expect(status).to.be.eq(201);
    expect(body).to.be.deep.eq(returnCreateMatch);
  
    sinon.restore();
  });

  afterEach(() => {
    sinon.restore();
  });
});
