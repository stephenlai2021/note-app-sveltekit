<script>
	import { showUpdateNoteModal, tempNote } from '$lib/stores/noteStore';
	import { fade } from 'svelte/transition';
	import supabase from '$lib/supabase/config';

	const closeModal = () => {
		$tempNote.menu = false;
		$showUpdateNoteModal = false;
	};

	const updateNote = async (item) => {
		closeModal();

		await supabase
			.from('note_app')
			.update({ title: item.title, description: item.description })
			.eq('id', item.id);
	};
</script>

<div class="popup-box" transition:fade={{ duration: 50 }}>
	<div class="popup" on:keydown on:click|stopPropagation>
		<div class="content">
			<header>
				<p>Update a Note</p>
				<i class="uil uil-times" on:keydown on:click={closeModal} />
			</header>
			<form action="#">
				<div class="row title">
					<label for="">Title</label>
					<input id="title" type="text" spellcheck="false" bind:value={$tempNote.title} />
				</div>
				<div class="row description">
					<label for="description">Description</label>
					<textarea id="description" spellcheck="false" bind:value={$tempNote.description} />
				</div>
				<button on:click={() => updateNote($tempNote)}>Update Note</button>
			</form>
		</div>
	</div>
</div>

<style>
	.popup-box {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 200;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.1);
	}
</style>
