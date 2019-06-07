<script>
  export let match;
  export let chosenMatch;
  export let handleClick;
</script>

<style>
  li {
    display: flex;
    justify-content: center;
    cursor: pointer;
    list-style: none;
    width: 80%;
    margin: auto;
  }
  li:nth-of-type(2n + 1) {
    background: rgba(48, 34, 34, 0.1);
  }
  li.active {
    background: rgba(22, 22, 22, 0.8);
    color: aquamarine;
  }
</style>

<li
  class={match.gameId === chosenMatch.gameId && 'active'}
  id={match.gameId}
  on:click={handleClick}>
   {match.homeTeam.abbreviation} - {match.visitorTeam.abbreviation}
</li>
