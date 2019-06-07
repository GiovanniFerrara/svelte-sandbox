<script>
 export let match
 export let choosenMatch
 export let hadleClick
</script>

<style>
  .active {
    background: rgba(22, 22, 22, 0.2);
  }
  li {
    cursor: pointer;
  }
</style>

<li
  class={match.gameId === choosenMatch.gameId && 'active'}
  id={match.gameId}
  on:click={hadleClick}>
   {match.gameId}
</li>
