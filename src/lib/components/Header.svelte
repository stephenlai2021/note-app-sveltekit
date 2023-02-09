<script>
	import { t, locales, locale } from '$lib/i18n/translations';
	import { darkMode, showMenu } from '$lib/stores/noteStore';
	import AvatarIcon from '$lib/components/icons/AvatarIcon.svelte';
	import MenuModal from '$lib/components/MenuModal.svelte';

	const handleMenuOpen = () => {
		// $showMenu = true
		$showMenu ? $showMenu = false : $showMenu = true
		document.body.addEventListener('click', handleMenuClose)
	}

	const handleMenuClose = () => {
		$showMenu = false
		document.body.removeEventListener('click', handleMenuClose)
	}
</script>

<div class="header">
	<h1>{$t('common.title')}</h1>

	<div class="icon-group">
		<span on:keydown on:click|stopPropagation={handleMenuOpen}><AvatarIcon width="40" height="40"/></span>
	</div>
</div>

{#if $showMenu}
	<MenuModal />
{/if}

<style>
	* {
		color: white;
	}

	.header {
		position: relative;
	}

	span {
		cursor: pointer;
	}

	.icon-group {
		margin-left: auto;
		display: flex;
		align-items: center;
	}

	.header {
		/* border: 1px solid; */
		padding: 10px 50px 0 50px;
		display: flex;
		align-items: center;
	}
	
	@media (max-width: 400px) {
		.header {
			padding: 10px 20px 0 20px;
		}
	}
</style>
