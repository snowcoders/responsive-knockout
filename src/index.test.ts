import * as mocha from "mocha";
import {Tester} from "./index";

describe('Module', () => {
    it ("Verify output", () => {
        if (new Tester().getFortyTwo() !== 42) {
            throw "Test failed";
        }
    });
});