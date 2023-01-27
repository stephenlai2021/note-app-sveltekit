<script>
  import '$lib/styles/note.css'
  import Header from '$lib/components/Header.svelte'
</script>

<svelte:head>
  <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
</svelte:head>

<div class="container">
  <Header />
  <slot />
</div>