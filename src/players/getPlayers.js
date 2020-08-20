const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

async function getPlayers() {
  return fetch("https://draftfantasyfootball.co.uk/graphql", {
    headers: {
      accept: "*/*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "cache-control": "no-cache",
      "content-type": "application/json",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrer: "https://draftfantasyfootball.co.uk/players-full",
    referrerPolicy: "no-referrer-when-downgrade",
    body:
      '{"operationName":"getPlayersFull","variables":{"scoring":null,"leagueId":null},"query":"query getPlayersFull($scoring: ScoringInput, $leagueId: String) {\\n  players {\\n    _id\\n    web_name\\n    first_name\\n    second_name\\n    element_type_id\\n    team_id\\n    type_name\\n    team_name\\n    team_name_short\\n    gameweek_totals\\n    rating\\n    total_mins\\n    total_goals\\n    total_assists\\n    total_clean_sheets\\n    total_goals_conceded\\n    total_own_goals\\n    total_penalties_saved\\n    total_penalties_missed\\n    total_yellow_cards\\n    total_red_cards\\n    total_saves\\n    total_penalties_earned\\n    total_penalties_conceded\\n    total_crosses\\n    total_key_passes\\n    total_big_chances_created\\n    total_clearances\\n    total_blocks\\n    total_interceptions\\n    total_tackles\\n    total_recoveries\\n    total_errors_leading_to_goal\\n    total_own_goal_earned\\n    total_pass_completion\\n    total_shots\\n    total_was_fouled\\n    total_accurate_pass_percentage\\n    total_shots_on_target\\n    total_aerial_won\\n    total_touches\\n    total_dribbles\\n    total_dispossessed\\n    total_fouls\\n    total_bps\\n    total_tir_points\\n    total_bonus\\n    total_points: totalCustomPoints(scoring: $scoring, leagueId: $leagueId)\\n    draft_points_per_90min\\n    draft_points_per_game\\n    averageDraftPosition\\n    rotowireInjuryUpdate {\\n      injuryType\\n      status\\n      returnDate\\n      __typename\\n    }\\n    __typename\\n  }\\n  clubs {\\n    _id\\n    id\\n    name\\n    __typename\\n  }\\n}\\n"}',
    method: "POST",
    mode: "cors",
  });
}

(async function() {
  const res = await getPlayers();
  const { data } = await res.json();

  try {
    fs.writeFileSync(
      path.join(__dirname, "player-data", "players-latest.json"),
      JSON.stringify(data.players)
    );
    console.log("Player json updated");
  } catch (e) {
    console.error(`Updating player json failed: `, e);
  }
})();
