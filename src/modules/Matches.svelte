<script>
  import * as Localstorage from "../services/Localstorage";
  import Match from './Match.svelte'

  let matches = Localstorage.getMatches();
  let filterInput = "";
  let choosenMatch = {};

  const hadleClick = e => {
    const choosenMatchId = e.target.id;
    choosenMatch = matches.find(m => m.gameId === choosenMatchId);
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
  <h1>All the matches</h1>
  {#if choosenMatch.gameId}
    <h3>Choosen match: {choosenMatch.gameId}</h3>
  {:else}
    <h3>NO choosen match</h3>
  {/if}
  <input type="text" bind:value={filterInput} />
  {#each matches as match}
    <Match
      match={match}
      choosenMatch={choosenMatch}
      hadleClick={hadleClick}
     />
  {/each}
</div>
