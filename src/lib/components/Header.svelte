<script>
	import { t, locales, locale } from '$lib/i18n/translations';
  import { darkMode } from '$lib/stores/noteStore'
	import LangIcon from '$lib/components/icons/LangIcon.svelte';
	import SunIcon from '$lib/components/icons/SunIcon.svelte';
	import MoonIcon from '$lib/components/icons/MoonIcon.svelte';

  // let modeToggle = false
</script>

<div class="header">
	<h1>{$t('common.title')}</h1>
	<div class="icon-group">
		{#if $locale === 'en'}
			<span class="menu-item" on:keydown on:click={() => ($locale = 'zh-TW')}>CHN/中文</span>
		{/if}
		{#if $locale === 'zh-TW'}
			<span class="menu-item" on:keydown on:click={() => ($locale = 'en')}>英文/ENG</span>
		{/if}
		<!-- <SunIcon /> -->
    {#if $darkMode}
      <SunIcon />
    {:else}
      <MoonIcon />
    {/if}

	</div>
</div>

<style>
	* {
		color: white;
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
</style>
