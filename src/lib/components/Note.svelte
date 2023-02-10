<script>
	import { showUpdateNoteModal, tempNote } from '$lib/stores/noteStore';
	import moment from 'moment';
	import UpdateNoteModal from '$lib/components/UpdateNoteModal.svelte';
	import ActionModal from '$lib/components/ActionModal.svelte';

	export let note;

	const handleMenuOpen = () => {
		note.menu = true;
		document.body.addEventListener('click', handleMenuClose);
	};

	const handleMenuClose = () => {
		note.menu = false;
		document.body.removeEventListener('click', handleMenuClose);
	}
</script>

<li class="note">
	<div class="details">
		<p>{note.title}</p>
		<span>{note.description}</span>
	</div>
	<div class="bottom-content">
		<span> {moment(new Date(note.created_at)).format('MMMM DD, YYYY')}</span>
		<div class="settings">
			<i
				on:keydown
				on:click|stopPropagation={handleMenuOpen}
				class="uil uil-ellipsis-h"
				style:transform="scale(0)"
				style:transition="transform 0.2s ease"
			/>

			{#if note.menu}
				<ActionModal {note} />
			{/if}
		</div>
	</div>

	{#if $showUpdateNoteModal}
		<UpdateNoteModal />
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

	.note .details::-webkit-scrollbar {
		width: 0;
	}

	.note .details:hover::-webkit-scrollbar {
		width: 5px;
	}

	.note .details:hover::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 25px;
	}

	.note .details:hover::-webkit-scrollbar-thumb {
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
		overflow-x: hidden;
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

	/* .settings .menu {
		z-index: 100;
		bottom: 0;
		right: -5px;
		padding: 5px 0;
		background: #fff;
		position: absolute;
		border-radius: 4px;
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
	}

	.settings .menu li {
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
	} */

	.menu li i {
		padding-right: 8px;
	}
</style>
