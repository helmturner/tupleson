export async function* readableStreamToAsyncIterable<T>(
	stream: ReadableStream<T>,
): AsyncIterable<T> {
	// Get a lock on the stream
	const reader = stream.getReader();

	try {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		while (true) {
			// Read from the stream
			const result = await reader.read();

			// Exit if we're done
			if (result.done) {
				return;
			}

			// Else yield the chunk
			yield result.value;
		}
	} finally {
		reader.releaseLock();
	}
}

export async function* mapIterable<T, TValue>(
	iterable: AsyncIterable<T>,
	fn: (v: T) => TValue,
): AsyncIterable<TValue> {
	for await (const value of iterable) {
		yield fn(value);
	}
}
