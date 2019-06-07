<script>
  import * as Localstorage from "../services/Localstorage";
  import * as MatchApi from "../services/MatchApi";
  import Match from "./Match.svelte";

  const filterTeam = (match, filterValue) => {
    filterValue = filterValue.toLowerCase();
    const inHomeTeam = match.homeTeam.fullname
      .toLowerCase()
      .includes(filterValue);
    const inVisitorTeam = match.visitorTeam.fullname
      .toLowerCase()
      .includes(filterValue);
    return inHomeTeam || inVisitorTeam;
  };
  //APP STATE
  let matches = Localstorage.getMatches();
  let filterInput = "";
  $: filteredMatches = matches.filter(match => filterTeam(match, filterInput));
  let chosenMatch = {};
  let homeTeam;
  let visitorTeam;
  // METHODS
  const handleClick = e => {
    const chosenMatchId = e.target.id;
    chosenMatch = matches.find(m => m.gameId === chosenMatchId);
    homeTeam = chosenMatch.homeTeam.fullname;
    visitorTeam = chosenMatch.visitorTeam.fullname;
  };

  if (matches.length === 0) {
    MatchApi.get().then(data => {
      matches = matches.concat(data);
      Localstorage.setMathches(matches);
    });
  }
</script>

<style>
  h1 {
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: rgba(55, 2, 22, 0.8);
  }
  h3 {
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: rgba(29, 146, 127, 0.767);
  }
  input {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .container {
    margin-top: 16px;
  }
</style>

<div>
  <h1>Do you want to bet?</h1>
  {#if chosenMatch.gameId}
    <h3>Match: {homeTeam} VS {visitorTeam}</h3>
  {:else}
    <h3>NO chosen match</h3>
  {/if}
  <input placeholder="Filter a match" type="text" bind:value={filterInput} />
  <div class="container">
    {#each filteredMatches as match}
      <Match {match} {chosenMatch} {handleClick} />
    {/each}
  </div>
</div>
