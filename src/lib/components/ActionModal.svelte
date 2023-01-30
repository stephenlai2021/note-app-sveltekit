<script>
  import { tempNote, showUpdateNoteModal, notes } from '$lib/stores/noteStore'
  export let note

  const slidefade = (node, params) => {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		return {
			delay: params.delay || 0,
			duration: params.duration || 200,
			easing: params.easing,
			css: (t, u) =>
				`transform-origin: bottom right; transform: ${existingTransform} scale(${t}); opacity: ${t};`
		};
	}

  const editNote = async (item) => {
		$tempNote = item;
		$showUpdateNoteModal = true;
    document.body.addEventListener('click', handleMenuClose)
	};

	const deleteNote = async (id, title) => {
		let text = `Are you sure to delete <${title}> ?`;
		if (confirm(text) == true) {
			$notes = $notes.filter((note) => note.id !== id);
			await supabase.from('note_app').delete().eq('id', id);
		} else {
			return;
		}
	};

  // const handleMenuOpen = () => {
	// 	$showUpdateNoteModal = true
	// 	document.body.addEventListener('click', handleMenuClose)
	// }

	const handleMenuClose = () => {
		$showUpdateNoteModal = false
		document.body.removeEventListener('click', handleMenuClose)
	}
</script>

<ul class="menu" transition:slidefade on:keydown on:click|stopPropagation>
  <li on:keydown on:click={() => editNote(note)}>
    <i class="uil uil-pen" />Edit
  </li>
  <li on:keydown on:click={() => deleteNote(note.id, note.title)}>
    <i class="uil uil-trash" />Delete
  </li>
</ul>

<style>
  .menu {
		z-index: 100;
		bottom: 0;
		right: -5px;
		padding: 5px 0;
		background: #fff;
		position: absolute;
		border-radius: 4px;
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
	}

	.menu li {
		height: 25px;
		width: 104px;
		font-size: 16px;
		margin-bottom: 2px;
		padding: 17px 15px;
		cursor: pointer;
		box-shadow: none;
		border-radius: 0;
		justify-content: flex-start;
	}

	.menu li:last-child {
		margin-bottom: 0;
	}

	.menu li:hover {
		background: #f5f5f5;
	}

	.menu li i {
		padding-right: 8px;
	}
</style>