<script lang="ts">
	import { nowPlayingSpotify, topSpotify, spotifyData } from '$lib/utils/spotify';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	onMount(async () => {
		$spotifyData.nowPlaying = await nowPlayingSpotify();
		if (!$spotifyData.topSpotify) $spotifyData.topSpotify = await topSpotify();
	});

	let showTopSpotify = false;
</script>

<div class="px-4 md:px-20 pt-4 md:pt-16 pb-32 text-gray-300">
	<h1 class="text-4xl text-white">Welcome to the lab</h1>
	<p class="text-sm mb-8">
		This page contains random stuff that I don't really know where else to put but here ¯\_(ツ)_/¯
	</p>

	<h3 class="text-2xl text-white">Spotify</h3>
	{#if $spotifyData.nowPlaying}
		<p class="mb-2">
			I am currently listening to <a href={$spotifyData.nowPlaying.link}
				>{$spotifyData.nowPlaying.name}</a
			>
			by
			{#each $spotifyData.nowPlaying.artists as artist, i}
				<a href={artist.link}>{artist.name}</a
				>{#if i < $spotifyData.nowPlaying.artists.length - 2},&nbsp;{:else if i === $spotifyData.nowPlaying.artists.length - 2}&nbsp;and&nbsp;{/if}
			{/each}
		</p>
	{/if}
	{#if $spotifyData.topSpotify}
		<p class="mb-2">
			{#if showTopSpotify}
				Don't want to see anymore?
				<button
					class="underline underline-offset-4 hover:text-blue-300"
					on:click={() => (showTopSpotify = false)}>Hide</button
				>.
			{:else}
				Do you want to see my top songs, artists and genres? <button
					class="underline underline-offset-4 hover:text-blue-300"
					on:click={() => (showTopSpotify = true)}>Click here</button
				>!
			{/if}
			<br />
			Data is updated in realtime from <a href="https://spotify.com/">Spotify</a> using
			<a href="https://github.com/Yureien/SPlaying">SPlaying</a>. I made this because I was bored,
			yes.
		</p>
		{#if showTopSpotify}
			<div class="flex flex-col gap-6" transition:slide={{ duration: 500, axis: 'y' }}>
				<div>
					<h5 class="text-xl mb-2">My Top Songs:</h5>
					<table class="table-fixed w-full">
						<thead>
							<tr>
								<th class="border text-lg p-1">Long Term</th>
								<th class="border text-lg p-1">Medium Term</th>
								<th class="border text-lg p-1">Short Term</th></tr
							>
						</thead>
						<tbody>
							{#each { length: 5 } as _, i}
								<tr>
									<td class="border p-1">
										<a href={$spotifyData.topSpotify.tracks.long_term[i].link}
											>{$spotifyData.topSpotify.tracks.long_term[i].name}</a
										>
									</td>
									<td class="border p-1">
										<a href={$spotifyData.topSpotify.tracks.medium_term[i].link}
											>{$spotifyData.topSpotify.tracks.medium_term[i].name}</a
										>
									</td>
									<td class="border p-1">
										<a href={$spotifyData.topSpotify.tracks.short_term[i].link}
											>{$spotifyData.topSpotify.tracks.short_term[i].name}</a
										>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				<div>
					<h5 class="text-xl mb-2">My Top Artists:</h5>
					<table class="table-fixed w-full">
						<thead>
							<tr>
								<th class="border text-lg p-1">Long Term</th>
								<th class="border text-lg p-1">Medium Term</th>
								<th class="border text-lg p-1">Short Term</th></tr
							>
						</thead>
						<tbody>
							{#each { length: 5 } as _, i}
								<tr>
									<td class="border p-1">
										<a href={$spotifyData.topSpotify.artists.long_term[i].link}
											>{$spotifyData.topSpotify.artists.long_term[i].name}</a
										>
									</td>
									<td class="border p-1">
										<a href={$spotifyData.topSpotify.artists.medium_term[i].link}
											>{$spotifyData.topSpotify.artists.medium_term[i].name}</a
										>
									</td>
									<td class="border p-1">
										<a href={$spotifyData.topSpotify.artists.short_term[i].link}
											>{$spotifyData.topSpotify.artists.short_term[i].name}</a
										>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				<div>
					<h5 class="text-xl mb-2">My Top Genres:</h5>
					<table class="table-fixed w-full">
						<thead>
							<tr>
								<th class="border text-lg p-1">Long Term</th>
								<th class="border text-lg p-1">Medium Term</th>
								<th class="border text-lg p-1">Short Term</th></tr
							>
						</thead>
						<tbody>
							<tr>
								<td class="border p-1">
									{$spotifyData.topSpotify.genres.long_term.join(', ')}
								</td>
								<td class="border p-1">
									{$spotifyData.topSpotify.genres.medium_term.join(', ')}
								</td>
								<td class="border p-1">
									{$spotifyData.topSpotify.genres.short_term.join(', ')}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	{/if}

	<h3 class="text-2xl text-white mt-8">Previous Site Iterations</h3>
	<p class="mb-2">
		I sometimes randomly nuke my website and create a new version from scratch. This time, I finally
		gave in and used a JavaScript framework to make my site. Although, after using Svelte, I wish I
		had done this sooner. My PageSpeed score improved compared to the no-JS sites! If you want to
		see my previous iterations, here:
	</p>
	<ul class="list-inside list-disc">
		<li>Version 1.0: A Mystery (I don't have the files anymore 😔)</li>
		<li>Version 2.0: <a href="/previous/terminal/index.html" target="_blank">The Terminal</a></li>
		<li>
			Version 3.0: <a href="/previous/css-minimal/index.html" target="_blank"
				>Lesser Minimalism (with CSS!)</a
			>
		</li>
		<li>
			Version 4.0: <a href="/previous/very-minimal/index.html" target="_blank"
				>Very Minimalism (and kinda ugly)</a
			>
		</li>
		<li>
			Version 5.0: <a href="/">This site :)</a>
		</li>
	</ul>
</div>

<style lang="postcss">
	a {
		@apply underline;
		@apply underline-offset-4;
		@apply hover:text-blue-300;
	}
</style>
