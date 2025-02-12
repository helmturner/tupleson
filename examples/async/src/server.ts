import http from "node:http";
import { createTsonStreamAsync } from "tupleson";

import { tsonOptions } from "./shared.js";

const tsonStringifyAsync = createTsonStreamAsync(tsonOptions);

const randomNumber = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * This function returns the object we will be sending to the client.
 */
export function getResponseShape() {
	async function* bigintGenerator() {
		const iterate = new Array(10).fill(0).map((_, i) => BigInt(i));
		for (const number of iterate) {
			await sleep(randomNumber(1, 400));
			yield number;
		}
	}

	async function* numberGenerator() {
		const iterate = new Array(10).fill(0).map((_, i) => i);
		for (const number of iterate) {
			await sleep(randomNumber(1, 400));
			yield number;
		}
	}

	return {
		bigints: bigintGenerator(),
		foo: "bar",
		numbers: numberGenerator(),
		promise: new Promise<number>((resolve) =>
			setTimeout(() => {
				resolve(42);
			}, 1),
		),
		rejectedPromise: new Promise<number>((_, reject) =>
			setTimeout(() => {
				reject(new Error("Rejected promise"));
			}, 1),
		),
	};
}

export type ResponseShape = ReturnType<typeof getResponseShape>;
async function handleRequest(
	req: http.IncomingMessage,
	res: http.ServerResponse,
) {
	res.writeHead(200, { "Content-Type": "application/json" });

	const obj = getResponseShape();

	// Stream the response to the client
	for await (const chunk of tsonStringifyAsync(obj)) {
		res.write(chunk);
	}

	res.end();
}

const server = http.createServer(
	(req: http.IncomingMessage, res: http.ServerResponse) => {
		handleRequest(req, res).catch((err) => {
			console.error(err);
			res.writeHead(500, { "Content-Type": "text/plain" });
			res.end("Internal Server Error\n");
		});
	},
);

const port = 3000;
server.listen(port);

console.log(`Server running at http://localhost:${port}`);
