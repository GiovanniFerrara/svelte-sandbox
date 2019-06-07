<script>
  import * as Localstorage from "../services/Localstorage";
  import Match from './Match.svelte'

  const filterTeam = (match, filterValue)=>{
    filterValue=filterValue.toLowerCase()
    const inHomeTeam = match.homeTeam.fullname.toLowerCase().includes(filterValue)
    const inVisitorTeam = match.visitorTeam.fullname.toLowerCase().includes(filterValue)
    return inHomeTeam || inVisitorTeam
  }

  let matches = Localstorage.getMatches();
  let filterInput = "";
  $: filteredMatches = matches.filter((match)=> filterTeam(match,filterInput))
  let chosenMatch = {};
  let homeTeam
  let visitorTeam

  const hadleClick = e => {
    const chosenMatchId = e.target.id;
    chosenMatch = matches.find(m => m.gameId === chosenMatchId);
    homeTeam = chosenMatch.homeTeam.fullname
    visitorTeam = chosenMatch.visitorTeam.fullname
  };
  if (matches.length === 0) {
    fetch("https://match-mock-api.herokuapp.com/api/match")
      .then(data => data.json())
      .then(data => {
        matches = matches.concat(data);
        Localstorage.setMathches(matches);
      });
  }
</script>

<style>
  .active {
    background: rgba(22, 22, 22, 0.2);
  }
  li {
    cursor: pointer;
  }
</style>

<div>
  <h1>All the matches {console.log(filteredMatches)}</h1>
  {#if chosenMatch.gameId}
    <h3>chosen match: {homeTeam} VS {visitorTeam}</h3>
  {:else}
    <h3>NO chosen match</h3>
  {/if}
  <input type="text" bind:value={filterInput} />
  {#each filteredMatches as match}
    <Match
      match={match}
      chosenMatch={chosenMatch}
      hadleClick={hadleClick}
     />
  {/each}
</div>
