<script>
  // import { page } from '$app/stores';
  // console.log('id', $page.params)
  // alert('id: ', $page.params)

  import { tempNote } from '$lib/stores/noteStore'
  
</script>

<!-- <h1>Hi, there !</h1> -->
<pre>
  {
    JSON.stringify($tempNote, null, 2)
  }
</pre>