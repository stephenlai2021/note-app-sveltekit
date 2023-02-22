<script>
	import { showUpdateNoteModal, tempNote, notes } from '$lib/stores/noteStore';
	import moment from 'moment';
	import UpdateNoteModal from '$lib/components/UpdateNoteModal.svelte';
	import ActionModal from '$lib/components/ActionModal.svelte';
	import EditIcon from '$lib/components/icons/EditIcon.svelte'
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte'
	import supabase from '$lib/supabase/config'

	export let note;

	// let filterDesc = note.description.replace("<br/>", "\r");
	let filterDesc = note.description.replace("\n", "<br/>");

	const handleMenuOpen = () => {
		note.menu = true;
		// document.body.addEventListener('click', handleMenuClose);
	};

	const deleteNote = async (id, title) => {
		let text = `Are you sure to delete <${title}> ?`;
		if (confirm(text) == true) {
			$notes = $notes.filter((note) => note.id !== id);
			const { error } = await supabase.from('note_app').delete().eq('id', id);
			console.log('delete error: ', error)
		} else {
			return;
		}
	};

	const editNote = (item) => {
		$tempNote = item;
		$showUpdateNoteModal = true;
	}
</script>

<li class="note">
	<div class="details">
		<p>{note.title}</p>
		<!-- <span>{filterDesc}</span> -->
		<span>{note.description}</span>
		<!-- <span>{note.description.replace("\r", "\n")}</span> -->
		<!-- <span class="description">{filterDesc}</span> -->
	</div>
	<div class="bottom-content">
		<span> {moment(new Date(note.created_at)).format('MMMM DD, YYYY')}</span>
		<div class="settings">
			<!-- <i
				on:keydown
				on:click|stopPropagation={handleMenuOpen}
				class="uil uil-ellipsis-h icon-menu"
				style:transform="scale(0)"
				style:transition="transform 0.2s ease"
			/> -->
			<div class="icon-edit" on:keydown on:click={() => editNote(note)}>
				<EditIcon width="20" height="20" />
			</div>
			<div class="icon-trashcan" on:keydown on:click={() => deleteNote(note.id, note.title)}>
				<DeleteIcon width="20" height="20" />
			</div>

			<!-- {#if note.menu}
				<ActionModal {note} />
			{/if} -->
		</div>
	</div>

	{#if $showUpdateNoteModal}
		<UpdateNoteModal {note} />
	{/if}
</li>

<style>
	.icon-edit,
	.icon-trashcan {
		/* border: 1px solid; */
		display: flex;
		/* align-items: center; */
	}

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

	.description {
		/* width: 250px; */
	}

	.note span {
		display: block;
		color: #575757;
		font-size: 16px;
		margin-top: 5px;

		white-space: pre;
		/* overflow-x: hidden;
		word-wrap: break-word;
		word-break: break-all;
		text-overflow: ellipsis;
		text-overflow: word-break; */
		/* border: 1px solid; */
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
		/* border: 1px solid; */
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 50px;
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
