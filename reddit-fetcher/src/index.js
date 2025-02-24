addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
	const redditURL = 'https://www.reddit.com/r/HellDads/about.json';

	const init = {
		headers: {
			'User-Agent': 'Mozilla/5.0 (compatible; CloudflareWorker)',
			Accept: 'application/json',
		},
	};

	try {
		const response = await fetch(redditURL, init);
		if (!response.ok) {
			return new Response('Error fetching Reddit data', { status: 500 });
		}
		const data = await response.text();
		return new Response(data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		return new Response('Fetch error: ' + error.toString(), { status: 500 });
	}
}
