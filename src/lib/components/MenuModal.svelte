<script>
	import { fade } from 'svelte/transition';
	import { t, locales, locale } from '$lib/i18n/translations';
	import { darkMode } from '$lib/stores/noteStore';
	import SunIcon from '$lib/components/icons/SunIcon.svelte';
	import MoonIcon from '$lib/components/icons/MoonIcon.svelte';

	const slidefade = (node, params) => {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		return {
			delay: params.delay || 0,
			duration: params.duration || 200,
			easing: params.easing,
			css: (t, u) =>
				`transform-origin: top right; transform: ${existingTransform} scale(${t}); opacity: ${t};`
		};
	}

</script>

<ul class="menu" transition:slidefade on:keydown on:click|stopPropagation>
	<li>
		{#if $locale === 'en'}
			<span class="menu-item" on:keydown on:click={() => ($locale = 'zh-TW')}>CHN / 中文</span>
		{/if}
		{#if $locale === 'zh-TW'}
			<span class="menu-item" on:keydown on:click={() => ($locale = 'en')}>英文 / ENG</span>
		{/if}
	</li>
	<li>
		{#if $darkMode}
			<div class="item" on:keydown on:click={() => ($darkMode = false)}>
				<SunIcon />
				<span class="text">Light</span>
			</div>
		{:else}
			<div class="item" on:keydown on:click={() => ($darkMode = true)}>
				<MoonIcon />
				<span class="text">Dark</span>
			</div>
		{/if}
	</li>
</ul>

<style>
	.text {
		margin-left: 20px;
	}

	.item {
		display: flex;
	}

	.menu li:last-child {
		margin-bottom: 0;
	}

	.menu li:hover {
		background: #f5f5f5;
	}

	.menu {
		position: absolute;
		top: 15px;
		right: 50px;
		padding: 5px;
		background: #fff;
		position: absolute;
		border-radius: 4px;
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
	}

	.menu li {
		height: 25px;
    width: 122px;
		font-size: 16px;
		margin-bottom: 2px;
		padding: 17px 15px;
		cursor: pointer;
		box-shadow: none;
		border-radius: 0;
		list-style: none;
		display: flex;
		align-items: center;
	}
</style>
