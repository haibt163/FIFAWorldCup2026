import { teams, Team } from "../data/teams";

export type MatchResult = {
  home: Team;
  away: Team;
  homeGoals: number;
  awayGoals: number;
  points: Record<string, number>; // team name -> points earned in this match
};

export type GroupStanding = {
  team: Team;
  points: number;
  goalDifference: number;
  goalsFor: number;
  goalsAgainst: number;
};

export function simulateMatch(home: Team, away: Team): MatchResult {
  // Simple random simulation based on strength
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

  return {
    home,
    away,
    homeGoals,
    awayGoals,
    points,
  };
}

export function calculateGroupStandings(groupTeams: Team[]): GroupStanding[] {
  const standings: Record<string, GroupStanding> = {};

  // Initialize standings
  groupTeams.forEach((t) => {
    standings[t.name] = {
      team: t,
      points: 0,
      goalDifference: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    };
  });

  // Simulate all matches within the group
  for (let i = 0; i < groupTeams.length; i++) {
    for (let j = i + 1; j < groupTeams.length; j++) {
      const result = simulateMatch(groupTeams[i], groupTeams[j]);

      // Update points
      Object.entries(result.points).forEach(([name, pts]) => {
        standings[name].points += pts;
      });

      // Update goals
      standings[result.home.name].goalsFor += result.homeGoals;
      standings[result.home.name].goalsAgainst += result.awayGoals;
      standings[result.away.name].goalsFor += result.awayGoals;
      standings[result.away.name].goalsAgainst += result.homeGoals;
    }
  }

  // Compute goal difference
  Object.values(standings).forEach((s) => {
    s.goalDifference = s.goalsFor - s.goalsAgainst;
  });

  // Return sorted array
  return Object.values(standings).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return 0; // tie
  });
}

export function getGroupResults(): Record<string, GroupStanding[]> {
  const groups: Record<string, Team[]> = {};

  // Group teams by group letter
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
  const thirdPlace: Team[] = [];

  Object.entries(groupResults).forEach(([group, standings]) => {
    top2[group] = [standings[0].team, standings[1].team];
    thirdPlace.push(standings[2].team);
  });

  // Sort third place teams by points, goal diff, goals for
  thirdPlace.sort((a, b) => {
    const aStanding = groupResults[a.group!].find((s) => s.team.name === a.name)!;
    const bStanding = groupResults[b.group!].find((s) => s.team.name === b.name)!;
    if (bStanding.points !== aStanding.points) return bStanding.points - aStanding.points;
    if (bStanding.goalDifference !== aStanding.goalDifference) return bStanding.goalDifference - aStanding.goalDifference;
    if (bStanding.goalsFor !== aStanding.goalsFor) return bStanding.goalsFor - aStanding.goalsFor;
    return 0;
  });

  // Pick top 8 third-place teams
  const bestThirds = thirdPlace.slice(0, 8);

  return { top2, bestThirds };
}
