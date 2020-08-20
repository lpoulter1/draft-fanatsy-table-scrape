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
      "meteor-login-token": "I-XuAxXZig_pkAaKMH8LfZRoZFfr0cVnQ_YlsMQFFpy",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      cookie:
        "_fbp=fb.2.1590681202747.795529219; ajs_group_id=null; _ga=GA1.3.1732164391.1590681204; ajs_anonymous_id=%2261857b83-8841-43ab-9b8b-cf5a853116a6%22; intercom-id-n1m0idnl=c7d8c40d-e764-4bbc-98c6-6896c6ce6aad; meteor_login_token=I-XuAxXZig_pkAaKMH8LfZRoZFfr0cVnQ_YlsMQFFpy; ajs_user_id=%22MgA4Nupd6YGWCPKhK%22; amplitude_iddraftfantasyfootball.co.uk=eyJkZXZpY2VJZCI6IjM3MWE4OTA4LWEwYTktNGY2My1iMjhjLWVhNTFhM2E5NWM1NSIsInVzZXJJZCI6Ik1nQTROdXBkNllHV0NQS2hLIiwiZ2xvYmFsVXNlclByb3BlcnRpZXMiOnsiZW1haWwiOiJscG91bHRlcjE5ODRAZ29vZ2xlbWFpbC5jb20iLCJpZCI6Ik1nQTROdXBkNllHV0NQS2hLIn0sIm9wdE91dCI6ZmFsc2V9; crisp-client%2Fsession%2F11c5dc4e-49de-4a6d-bf4b-508b555583eb=session_af9dfe5b-7302-40bd-8254-831f26a401ad; intercom-session-n1m0idnl=UjZyS2tXY0Zoei9PdjV4Q1I0TWYybVZUUmlyekZQL0I1RjFMMFhBYWFDYk5CQlRPYVMzck92akFNdTkralJQdi0teTZobEJtaGJieFNackZRWlZITzlFZz09--f20bd8205a164c4e5ac67a76bd647498136836b9; _gid=GA1.3.1754742408.1597934880; _hjid=8ba68747-d797-459c-b1af-1e4ef7b2e8b7; _hjIncludedInPageviewSample=1; _hjAbsoluteSessionInProgress=0; mp_ea7eecba53313f21feb8e49b94f188b5_mixpanel=%7B%22distinct_id%22%3A%20%22MgA4Nupd6YGWCPKhK%22%2C%22%24device_id%22%3A%20%221725bfcf4eb14f-07c9d50ce4a94a-1b3f6256-1aeaa0-1725bfcf4ec3dc%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%2C%22%24user_id%22%3A%20%22MgA4Nupd6YGWCPKhK%22%2C%22mp_name_tag%22%3A%20%22lpoulter1984%40googlemail.com%22%2C%22id%22%3A%20%22MgA4Nupd6YGWCPKhK%22%2C%22%24email%22%3A%20%22lpoulter1984%40googlemail.com%22%7D",
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
