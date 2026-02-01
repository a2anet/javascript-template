// SPDX-FileCopyrightText: 2025-present Your Name <your.email@example.com>
//
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, test } from "bun:test";
import { VERSION } from "../src/index.js";

describe("package", () => {
    test("should have a version", () => {
        expect(VERSION).toBeDefined();
        expect(VERSION).toMatch(/^\d+\.\d+\.\d+/);
    });
});
