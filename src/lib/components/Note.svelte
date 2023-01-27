<script>
	import moment from 'moment';
	import { showUpdateNoteModal, notes, tempNote } from '$lib/stores/noteStore';
	import { browser } from '$app/environment';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	// import { page } from '$app/stores';
	import supabase from '$lib/supabase/config';
	import UpdateNoteModal from '$lib/components/UpdateNoteModal.svelte';

	export let note;

	let noteTemp = { ...note, menuShown: false };

	const editNote = async (item) => {
		$tempNote = item;
		$showUpdateNoteModal = true;
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

	const showMenu = async () => {
		noteTemp.menuShown = !noteTemp.menuShown;
	};

	const slidefade = (node, params) => {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		return {
			// delay: params.delay || 0,
			duration: params.duration || 150,
			easing: params.easing || cubicOut,
			css: (t, u) =>
				`transform-origin: bottom right; transform: ${existingTransform} scaleY(${t}); opacity: ${t};`
		};
	};

	$: if (browser) {
		document.addEventListener('click', (e) => {
			noteTemp.menuShown = false;
		});
	}
</script>

<li class="note" on:keydown on:click|stopPropagation>
	<div class="details">
		<p>{noteTemp.title}</p>
		<span>{noteTemp.description}</span>
	</div>
	<div class="bottom-content">
		<span> {moment(new Date(noteTemp.created_at)).format('MMMM DD, YYYY')}</span>
		<div class="settings">
			<i
				on:keydown
				on:click={showMenu}
				class="uil uil-ellipsis-h"
				style:transform="scale(0)"
				style:transition="transform 0.2s ease"
			/>

			{#if noteTemp.menuShown}
				<ul class="menu" transition:fade>
					<!-- <ul class="menu" transition:slidefade> -->
					<li on:keydown on:click={() => editNote(noteTemp)}>
						<i class="uil uil-pen" />Edit
					</li>
					<li on:keydown on:click={() => deleteNote(noteTemp.id, noteTemp.title)}>
						<i class="uil uil-trash" />Delete
					</li>
				</ul>
			{/if}
		</div>
	</div>

	{#if $showUpdateNoteModal}
		<UpdateNoteModal {$tempNote} />
	{/if}
</li>

<style>
	.note {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.note .details {
		max-height: 175px;
		overflow-y: auto;
	}

	.note .details::-webkit-scrollbar,
	.popup textarea::-webkit-scrollbar {
		width: 0;
	}

	.note .details:hover::-webkit-scrollbar,
	.popup textarea:hover::-webkit-scrollbar {
		width: 5px;
	}

	.note .details:hover::-webkit-scrollbar-track,
	.popup textarea:hover::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 25px;
	}

	.note .details:hover::-webkit-scrollbar-thumb,
	.popup textarea:hover::-webkit-scrollbar-thumb {
		background: #e6e6e6;
		border-radius: 25px;
	}

	.note p {
		font-size: 22px;
		font-weight: 500;
	}

	.note span {
		display: block;
		color: #575757;
		font-size: 16px;
		margin-top: 5px;
		/* width: 225px; */
		overflow-x: hidden;
		/* overflow-wrap: break-work; */
		/* word-wrap: break-word; */
		white-space: pre;
		text-overflow: ellipsis;
		text-overflow: word-break;
	}

	.note .bottom-content {
		padding-top: 10px;
		border-top: 1px solid #ccc;
	}

	.bottom-content span {
		color: #6d6d6d;
		font-size: 14px;
	}

	.bottom-content .settings {
		position: relative;
	}

	.bottom-content .settings i {
		color: #6d6d6d;
		cursor: pointer;
		font-size: 15px;
	}

	.settings .menu {
		z-index: 100;
		bottom: 0;
		right: -5px;
		padding: 5px 0;
		background: #fff;
		position: absolute;
		border-radius: 4px;
		/* transform: scale(0); */
		/* transform-origin: bottom right; */
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
		/* transition: transform 0.2s ease; */
	}

	.settings.show .menu {
		transform: scale(1);
	}
	.settings .menu li {
		height: 25px;
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
