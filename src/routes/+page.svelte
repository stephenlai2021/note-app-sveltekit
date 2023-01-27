<script>
	import supabase from '$lib/supabase/config';
	import { showAddNewNoteModal, notes } from '$lib/stores/noteStore';
	import { t, locale } from '$lib/i18n/translations';
	import { browser } from '$app/environment';
	import AddNewNoteModal from '$lib/components/AddNewNoteModal.svelte';
	import Note from '$lib/components/Note.svelte';

	export let data;
	const { notesArray } = data;

	$notes = notesArray;
	console.log('notes: ', $notes)
</script>

<div class="wrapper">
	<li class="add-box" on:keydown on:click={() => ($showAddNewNoteModal = true)}>
		<div class="icon"><i class="uil uil-plus" /></div>
		<p>{$t('common.description')}</p>
	</li>

	{#each $notes as note}
		<Note {note} />
	{/each}
</div>

{#if $showAddNewNoteModal}
	<AddNewNoteModal />
{/if}
