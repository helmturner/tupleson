import { expect, test } from "vitest";

import { createTson } from "../tson.js";
import { tsonSet } from "./tsonSet.js";

test("Set", () => {
	const t = createTson({
		types: [tsonSet],
	});

	const expected = new Set(["a", "b"]);

	const stringified = t.stringify(expected);
	const deserialized = t.parse(stringified);
	expect(deserialized).toEqual(expected);
});