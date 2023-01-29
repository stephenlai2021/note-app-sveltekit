<script>
	import { showAddNewNoteModal, notes } from '$lib/stores/noteStore';
	import { fade } from 'svelte/transition';
	import supabase from '$lib/supabase/config';

	let title = '';
	let description = '';

	const addNewNote = async () => {
		$showAddNewNoteModal = false;

		const tempNote = {
			id: crypto.randomUUID(),
			created_at: new Date().toLocaleString(),
			title,
			description
		};

		await supabase.from('note_app').insert([{ title, description }]);

		$notes = [...$notes, tempNote];
	};
</script>

<div class="popup-box" transition:fade={{ duration: 100 }}>
	<div class="popup" on:keydown on:click|stopPropagation>
		<div class="content">
			<header>
				<p>Add a new Note</p>
				<!-- <i class="uil uil-times" on:keydown on:click|stopPropagation /> -->
				<i class="uil uil-times" on:keydown on:click={() => ($showAddNewNoteModal = false)} />
				<!-- <i class="uil uil-times" /> -->
			</header>
			<form action="#">
				<div class="row title">
					<label for="">Title</label>
					<input id="title" type="text" spellcheck="false" bind:value={title} />
				</div>
				<div class="row description">
					<label for="description">Description</label>
					<textarea id="description" spellcheck="false" bind:value={description} />
				</div>
				<button on:click={addNewNote}>Add Note</button>
			</form>
		</div>
	</div>
</div>

<style>
	.popup textarea:hover::-webkit-scrollbar {
		width: 5px;
	}

	.popup textarea:hover::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 25px;
	}
</style>