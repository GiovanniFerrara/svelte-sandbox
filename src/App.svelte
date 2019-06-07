<script>
  import Matches from "./modules/Matches.svelte";
  export let name;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<Matches />
<h1>Hello {name}!</h1>
