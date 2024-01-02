<script>
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import WavingHand from '$lib/images/waving-hand.svg';

	const greetings = ['Hello', 'नमस्ते', 'こんにちは', 'Guten tag', '你好', 'Bonjour', 'γεια'];
	let greetingCounter = 0;

	const socials = [
		{ link: 'https://github.com/Yureien', icon: 'fa6-brands:github' },
		{ link: 'https://twitter.com/@Yureien', icon: 'fa6-brands:twitter' },
		{ link: 'https://www.linkedin.com/in/sohamsendev/', icon: 'fa6-brands:linkedin' },
		{ link: 'https://t.me/Yureien', icon: 'fa6-brands:telegram' },
		{ link: 'https://open.spotify.com/user/33qturbwfor1ei5nqdtis0dop', icon: 'fa6-brands:spotify' },
		{ link: 'mailtoto:contact@sohamsen.me', icon: 'ic:baseline-email' }
	];

	onMount(() => {
		const interval = setInterval(() => {
			greetingCounter = (greetingCounter + 1) % greetings.length;
		}, 3000);

		return () => clearInterval(interval);
	});
</script>

<div class="flex max-sm:flex-col max-sm:gap-10 h-screen w-full justify-center items-center">
	<div class="w-1/2 max-sm:w-1/4 flex justify-center items-center">
		<img src={WavingHand} alt="Hi" class="w-80 animate-handwave origin-[76.5%_79.5%]" />
	</div>
	<div class="md:flex-grow flex flex-col justify-center gap-6">
		<div class="mb-12 relative">
			{#each greetings as greeting, i}
				{#if greetingCounter === i}
					<div
						class="absolute overflow-hidden text-5xl md:text-6xl leading-normal"
						in:fly={{ x: 300, duration: 500, easing: quintOut }}
						out:fly={{ x: -300, duration: 500, easing: quintOut }}
					>
						{greeting}
					</div>
				{/if}
			{/each}
		</div>
		<div class="text-4xl">I am Soham Sen</div>
		<div class="text-xl">Tinkerer. Developer. Learner.</div>
		<div class="flex gap-5">
			{#each socials as social}
				<a href={social.link} target="_blank" class="block"><Icon icon={social.icon} class="w-6 h-6" /></a>
			{/each}
		</div>
	</div>
</div>
