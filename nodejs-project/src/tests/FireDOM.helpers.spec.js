var assert = require('assert');
import { arePropsEqual } from "../lib/FireDOM.helpers.js";

console.log(arePropsEqual)

describe("are props equal", function () {
    it("should compare simple object", function () {
        assert.equal(arePropsEqual({ "a": "b" }, { "a": "b" }), true)
        assert.equal(arePropsEqual({ "a": "b" }, { "a": "c" }), false)
    })

    it("should compare objects with diffrent keys length", function () {
        assert.equal(arePropsEqual({ "a": "b", "aa": "b" }, { "a": "b" }), false)
    })

    it("should compare objects with diffrent values and same key length", function () {
        assert.equal(arePropsEqual({ "a": "b", "a1": "b1" }, { "a": "b", "a1": "b2" }), false)
    })

    it("should compare nested objects", function () {
        assert.equal(arePropsEqual({ "a": {}, "x": "z" }, { "a": { "c": "d" }, "x": "z" }), false)
        assert.equal(arePropsEqual({ "a": { "xxx": "d" }, "x": "z" }, { "a": { "c": "d" }, "x": "z" }), false)
        assert.equal(arePropsEqual({ "a": { "c": { "d": { "e": "1" } } }, "x": "z" }, { "a": { "c": { "d": { "e": "f" } } }, "x": "z" }), false)
        assert.equal(arePropsEqual({ "a": { "c": "d" }, "x": "z" }, { "a": { "c": "d" }, "x": "z" }), true)
        assert.equal(arePropsEqual({ "a": { "c": { "d": { "e": "f" } } }, "x": "z" }, { "a": { "c": { "d": { "e": "f" } } }, "x": "z" }), true)
    })

    it("should compare simple arrays", function () {
        assert.equal(arePropsEqual({ "a": [1, 2, 3] }, { "a": [2, 3, 4] }), false)
        assert.equal(arePropsEqual({ "a": [1, 2, 3] }, { "a": [1, 2] }), false)
        assert.equal(arePropsEqual({ "a": [{ "c": "d" }, 2] }, { "a": [{ "c": "d" }, 3] }), false)
        assert.equal(arePropsEqual({ "a": [{ "c": "d" }, 2] }, { "a": [{ "c": "d" }, 2] }), true)
        assert.equal(arePropsEqual({ "a": [1, 2, 3] }, { "a": [1, 2, 3] }), true)
        assert.equal(arePropsEqual({ "a": ["www"] }, { "a": ["www"] }), true)
        assert.equal(arePropsEqual({ "a": ["www"] }, { "a": ["xxx"] }), false)
    })
})