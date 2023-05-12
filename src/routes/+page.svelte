<script lang="ts">
	import { onMount } from 'svelte';
	import { createWorker, type Worker } from 'tesseract.js';

	let video : HTMLVideoElement, canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D, worker: Worker;
	let running = false;
	let output = '';

	const start = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true
			});

			video.srcObject = stream;
			video.play();
			video.onresize = () => {
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;
			};
			running = true;
		} catch (error) {
			/* Do you have a webcam? */
			console.log(error);
            alert("Please allow access to your webcam")
		}

		/*
		// Initialize Tesseract worker
		worker = await createWorker({
			logger: (m) => console.log(m)
		});
		await worker.load();
		await worker.loadLanguage('eng');
		await worker.initialize('eng');
		*/
	};

	const capture = async () => {
		ctx = canvas.getContext('2d')!;
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		const img = canvas.toDataURL('image/png');
		/*
		const {
			data: { text }
		} = await worker.recognize(img);
		output = text;
		*/
	};

	// Start the webcam
	onMount(start);
</script>

<main>
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={video} />
	<canvas bind:this={canvas} />
	{#if running}
		<button on:click={capture}>Capture</button>
		<div><b>output:</b> {output}</div>
	{:else}
		<div>Loading...</div>
	{/if}
</main>

<style>
	video {
		border: 1px solid black;
	}
</style>