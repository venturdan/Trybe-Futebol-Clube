import { Router } from 'express';
import TeamsRoute from './team.route';
import UsersRoute from './user.route';
import MatchesRoute from './matches.route';
import LeaderboardRoute from './leaderboard.route';

const router = Router();
const teamsRoute = new TeamsRoute();
const usersRoute = new UsersRoute();
const matchesRoute = new MatchesRoute();
const leaderboardRoute = new LeaderboardRoute();

router.use('/teams', teamsRoute.withGetAllTeams().withGetTeamById().build());
router.use('/login', usersRoute.withLogin().withGetRoleById().build());
router.use('/matches', matchesRoute.withGetAllMatches().withGetMatchById()
  .withGetUpdateGoals().withCreateMatch()
  .build());
router.use('/leaderboard', leaderboardRoute.withGetLeaderboardHome().build());

export default router;
