<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import '../app.css';
	import { goto, preloadCode, preloadData } from '$app/navigation';

	const links = [
		{ name: 'Home', link: '/', icon: 'fe:home', scrollable: true },
		{ name: 'About', link: '/about', icon: 'fe:hash', scrollable: true },
		{ name: 'Lab', link: '/lab', icon: 'iconoir:flask', scrollable: true },
		{ name: 'Blog', link: 'https://blog.sohamsen.me', icon: 'bx:pen', scrollable: false },
		{ name: 'Resume', link: '/resume.pdf', icon: 'iconoir:attachment', scrollable: false }
	];
	const scrollableLinks = links.filter((link) => link.scrollable);

	let mounted = false;
	let scrollY = 0;
	let scrollClearTimeout: number | undefined = undefined;
	let scrollingToNextPage: boolean = false;

	onMount(() => {
		document.addEventListener('wheel', (ev) => {
			if (scrollingToNextPage) return;
			if (document.body.scrollHeight > window.innerHeight) {
				const atTop = window.scrollY == 0;
				const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 1;

				if (!atTop && !atBottom) return;
				if (atTop && ev.deltaY > 0) return;
				if (atBottom && ev.deltaY < 0) return;
			}

			scrollY += ev.deltaY;
			if (scrollClearTimeout) clearTimeout(scrollClearTimeout);
			scrollClearTimeout = setTimeout(() => (scrollY = 0), 100);
		});
		mounted = true;

		preloadCode('/about');
		preloadCode('/lab');
	});

	const pagePositions: Record<string, number> = scrollableLinks.reduce(
		(acc, link, index) => ({ ...acc, [link.link]: index + 1 }),
		{}
	);
	let nextPage: string | undefined = undefined;
	let slideDir: number = 0;

	$: if (
		nextPage &&
		pagePositions[$page.url.pathname] !== undefined &&
		pagePositions[nextPage] !== undefined &&
		pagePositions[$page.url.pathname] !== pagePositions[nextPage]
	) {
		slideDir =
			Math.sign(pagePositions[nextPage] - pagePositions[$page.url.pathname]) *
			pagePositions[nextPage];
	}

	$: if (Math.abs(scrollY) >= 300) {
		const sign = Math.sign(scrollY);
		scrollY = 0;
		const index = scrollableLinks.findIndex((link) => link.link === $page.url.pathname);
		if (index !== -1) {
			const newIndex = Math.max(0, Math.min(scrollableLinks.length - 1, index + sign));
			if (newIndex !== index) {
				scrollingToNextPage = true;
				setTimeout(() => (scrollingToNextPage = false), 500);
				nextPage = scrollableLinks[newIndex].link;
				goto(scrollableLinks[newIndex].link);
			}
		}
	}
</script>

<svelte:head>
	<title>SohamSen.Me</title>
	<meta name="description" content="Soham Sen's personal website." />
</svelte:head>

<!-- Stars -->
<div class="fixed overflow-hidden h-screen w-screen -z-50">
	{#if mounted}
		{#each { length: 200 } as _, i}
			<div
				class="absolute w-[2px] h-[2px] bg-[#fff0] rounded animate-twinkle"
				style:left={`${Math.random() * window.innerWidth}px`}
				style:top={`${Math.random() * window.innerHeight}px`}
				style:animation-duration={`${Math.random() * 10 + 5}s`}
				style:animation-delay={`${Math.random() * (i < 50 ? 2 : 25)}s`}
			></div>
		{/each}
	{/if}
</div>

{#key slideDir}
	<div class="min-h-screen w-full overflow-x-hidden">
		<div in:fly={{ duration: 500, x: 500 * Math.sign(slideDir) }}>
			<slot />
		</div>
	</div>
{/key}

<div
	class="fixed bottom-10 transform -translate-x-1/2
		flex items-baseline bg-white-5 backdrop-blur-sm rounded-xl"
	style:left="calc(50% + (100vw - 100%)/2)"
>
	{#each links as link}
		<a
			on:click={() => (nextPage = link.link)}
			href={link.link}
			class="flex flex-col justify-center w-16 h-16 items-center rounded-xl py-2 px-4"
		>
			<Icon icon={link.icon} class="w-8 h-8 text-white" />
			<span class="text-xs">{link.name}</span>
		</a>
		<div
			class="absolute w-16 h-16 bg-white-5 rounded-xl -z-10 transition-[left] duration-500 ease-out"
			class:left-0={$page.url.pathname === '/'}
			class:left-16={$page.url.pathname === '/about'}
			class:left-32={$page.url.pathname === '/lab'}
		></div>
	{/each}
</div>
