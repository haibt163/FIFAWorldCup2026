import { teams, Team } from "../data/teams";

export type MatchResult = {
  home: Team;
  away: Team;
  homeGoals: number;
  awayGoals: number;
  points: Record<string, number>;
};

export type GroupStanding = {
  team: Team;
  points: number;
  goalDifference: number;
  goalsFor: number;
  wins: number;
  goalsAgainst: number;
};

export function simulateMatch(home: Team, away: Team): MatchResult {
  const homeProb = home.strength / (home.strength + away.strength);
  const homeGoals = Math.floor(Math.random() * 5);
  const awayGoals = Math.floor(Math.random() * 5);

  const points: Record<string, number> = {};
  if (homeGoals > awayGoals) {
    points[home.name] = 3;
    points[away.name] = 0;
  } else if (homeGoals < awayGoals) {
    points[home.name] = 0;
    points[away.name] = 3;
  } else {
    points[home.name] = 1;
    points[away.name] = 1;
  }

  return { home, away, homeGoals, awayGoals, points };
}

const compareStandings = (a: GroupStanding, b: GroupStanding) => {
  if (b.points !== a.points) return b.points - a.points;
  if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
  if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
  return b.wins - a.wins;
};

export function calculateGroupStandings(groupTeams: Team[]): GroupStanding[] {
  const standings: Record<string, GroupStanding> = {};

  groupTeams.forEach((t) => {
    standings[t.name] = { team: t, points: 0, goalDifference: 0, goalsFor: 0, wins: 0, goalsAgainst: 0 };
  });

  for (let i = 0; i < groupTeams.length; i++) {
    for (let j = i + 1; j < groupTeams.length; j++) {
      const result = simulateMatch(groupTeams[i], groupTeams[j]);
      Object.entries(result.points).forEach(([name, pts]) => {
        standings[name].points += pts;
      });
      if (result.homeGoals > result.awayGoals) standings[result.home.name].wins++;
      if (result.awayGoals > result.homeGoals) standings[result.away.name].wins++;
      standings[result.home.name].goalsFor += result.homeGoals;
      standings[result.home.name].goalsAgainst += result.awayGoals;
      standings[result.away.name].goalsFor += result.awayGoals;
      standings[result.away.name].goalsAgainst += result.homeGoals;
    }
  }

  Object.values(standings).forEach((s) => {
    s.goalDifference = s.goalsFor - s.goalsAgainst;
  });

  return Object.values(standings).sort(compareStandings);
}

export function getGroupResults(): Record<string, GroupStanding[]> {
  const groups: Record<string, Team[]> = {};
  teams.forEach((t) => {
    if (!groups[t.group]) groups[t.group] = [];
    groups[t.group].push(t);
  });

  const results: Record<string, GroupStanding[]> = {};
  Object.entries(groups).forEach(([group, groupTeams]) => {
    results[group] = calculateGroupStandings(groupTeams);
  });
  return results;
}

export function getTopTeams(): {
  top2: Record<string, Team[]>;
  bestThirds: Team[];
} {
  const groupResults = getGroupResults();
  const top2: Record<string, Team[]> = {};
  const thirdPlaceStandings: GroupStanding[] = [];

  Object.entries(groupResults).forEach(([group, standings]) => {
    top2[group] = [standings[0].team, standings[1].team];
    thirdPlaceStandings.push(standings[2]);
  });

  const sortedThirds = thirdPlaceStandings.sort(compareStandings);
  const bestThirds = sortedThirds.slice(0, 8).map((s) => s.team);

  return { top2, bestThirds };
}
