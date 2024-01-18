<script>
	const stats = [
		{ name: 'Age', value: '22' },
		{ name: 'Studying At', value: 'Indian Institute of Technology, Kharagpur' },
		{ name: 'Likes', value: 'space, science, anime, music, programming, gaming, beer' },
		{ name: 'Dislikes', value: 'pineapple on pizza, pure mathematics' }
	];
</script>

<div class="grid grid-cols-4 max-sm:grid-cols-1 max-sm:gap-6 w-full px-4 md:px-20 pt-4 md:pt-16 pb-32">
	<div class="md:order-2 max-sm:w-full flex flex-col items-center">
		<div class="mb-4 relative w-52 h-52 avatar-container">
			<div class="absolute w-full h-full avatar-front">
				<img
					src="https://avatars.githubusercontent.com/u/17357089"
					alt="Avatar"
					class="rounded-full"
				/>
			</div>
			<div class="absolute w-full h-full avatar-back">
				<img src="/realavatar.jpeg" alt="Real Avatar" class="rounded-full" />
			</div>
		</div>
		<table class="table-auto text-left">
			<tbody>
				{#each stats as stat}
					<tr class="border">
						<th class="border-r px-2 py-1 bg-white-15">{stat.name}</th>
						<td class="px-2 py-1 bg-white-5">{stat.value}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="md:order-1 md:col-span-3 md:flex-grow flex flex-col gap-6 md:px-10 text-gray-300">
		<h1 class="text-4xl text-white">Hey there!</h1>
		<div>
			<h3 class="text-2xl text-white mb-2">TL;DR of my life</h3>
			<p>
				I loved exploring tech every since I was a kid, having taken apart (read: broken) a
				telephone at the age of 6, made an LED torch at 7, and started fiddling with HTML/CSS/JS at
				8.
				<br />
				Although my first proper experience with programming was at the age of 11, when I created my
				first Android app, with code shamelessly stolen from StackOverflow. And got my first soldering
				iron burn at the age of 12, when I frankenstein'd two broken phones to make a (questionably)
				working one.
				<br />
				Nowadays my life involves opening a beer can and bashing on the keyboard until the pixels on
				the screen change in a way I like.
			</p>
		</div>
		<div>
			<h3 class="text-2xl text-white mb-2">Interests</h3>
			<p>I am interested in a lot of things, let's make a list:</p>
			<ul class="list-disc list-inside">
				<li>
					<b>Space</b> was something I was interested in since forever, and I really want to go to space
					someday. For now, I participated and won a few astronomy olympiads and competitions, got a
					telescope of my own to stare at the sky and am currently trying to figure out radio astronomy.
				</li>
				<li>
					I love reading about <b>STEM</b> topics, although mostly excluding the "M" in STEM (I don't
					like pure maths; I am an engineer).
				</li>
				<li>
					I have been watching/reading <b>anime & manga</b> since a long time now. It's my favorite form
					of entertainment, and for a variety of reasons, I prefer them over other forms of entertainment.
				</li>
				<li>
					And of course, I am a <b>gamer</b>, been playing games ever since I got to use my first
					PC.
				</li>
				<li>
					Can't leave out <b>programming</b>, after all, it's what I do both for a living and as a
					hobby.
				</li>
				<li>
					Ofcourse, that includes <b>hacking</b> too! Both hardware and software hacking, including but
					not limited to RF-snooping, CTFs, reverse engineering, etc.
				</li>
			</ul>
			<div class="border border-dashed mt-4 p-2 w-fit">
				<b>Editor's Note:</b> This list is incomplete and ever expanding.
			</div>
		</div>
		<div>
			<h3 class="text-2xl text-white mb-2">Current Life Status</h3>
			<p>About to graduate from university!</p>
		</div>
	</div>
</div>

<style type="postcss">
	.avatar-back,
	.avatar-front {
		backface-visibility: hidden;
		transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.avatar-front {
		transform: rotateY(0deg);
	}
	.avatar-back {
		transform: rotateY(180deg);
	}
	.avatar-container:hover .avatar-front {
		transform: rotateY(180deg);
	}
	.avatar-container:hover .avatar-back {
		transform: rotateY(0);
	}
</style>
