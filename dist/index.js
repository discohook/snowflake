"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snowflake = void 0;
var Snowflake = /** @class */ (function () {
    function Snowflake() {
    }
    /* c8 ignore start */
    /**
     * Generates a single snowflake.
     * @param {Date|number} [timestamp = Date.now] - Timestamp to generate from
     * @param {number} [shard_id = Snowflake.SHARD_ID] - Shard ID for the snowflake
     * @param {Date|number} [epoch = Snowflake.EPOCH] - Epoch for the snowflake
     * @returns {string}
     */
    /* c8 ignore end */
    Snowflake.generate = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.timestamp, timestamp = _c === void 0 ? Date.now() : _c, _d = _b.shard_id, shard_id = _d === void 0 ? Snowflake.SHARD_ID : _d, _e = _b.epoch, epoch = _e === void 0 ? Snowflake.EPOCH : _e;
        if (timestamp instanceof Date)
            timestamp = timestamp.valueOf();
        else
            timestamp = new Date(timestamp).valueOf();
        if (epoch instanceof Date)
            epoch = epoch.valueOf();
        else
            epoch = new Date(epoch).valueOf();
        // tslint:disable:no-bitwise
        var result = (BigInt(timestamp) - BigInt(epoch)) << BigInt(22);
        result = result | (BigInt(shard_id % 1024) << BigInt(12));
        result = result | BigInt(Snowflake.SEQUENCE++ % 4096);
        // tslint:enable:no-bitwise
        return result.toString();
    };
    /**
     * Deconstruct a snowflake to its values using the `Generator.epoch`.
     * @param {SnowflakeResolvable} snowflake - Snowflake to deconstruct
     * @param {Date|number} epoch - The epoch of the snowflake
     * @returns {DeconstructedSnowflake}
     */
    Snowflake.parse = function (snowflake, epoch) {
        var binary = Snowflake.binary(snowflake);
        return {
            timestamp: Number((BigInt(snowflake) >> BigInt(22)) + BigInt(new Date(epoch !== null && epoch !== void 0 ? epoch : Snowflake.EPOCH).valueOf())),
            shard_id: Snowflake.extractBits(snowflake, 42, 10),
            sequence: Snowflake.extractBits(snowflake, 52),
            binary: binary,
        };
    };
    Snowflake.isValid = function (snowflake) {
        if (!/^[\d]{17,22}$/.test(snowflake)) {
            return false;
        }
        try {
            Snowflake.parse(snowflake);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    /**
     * Extract bits and their values from a snowflake.
     * @param {SnowflakeResolvable} snowflake - Snowflake to extract from
     * @param {number|bigint} shift - Number of bits to shift before extracting
     * @param {number|bigint} length - Number of bits to extract before stopping
     * @returns {bigint}
     */
    Snowflake.extractBits = function (snowflake, start, length) {
        return parseInt(length
            ? Snowflake.binary(snowflake).substring(start, start + length)
            : Snowflake.binary(snowflake).substring(start), 2);
    };
    /**
     * Transform a snowflake into its 64Bit binary string.
     * @param {SnowflakeResolvable} snowflake - Snowflake to transform
     * @returns {string}
     * @private
     */
    Snowflake.binary = function (snowflake) {
        var cached64BitZeros = "0000000000000000000000000000000000000000000000000000000000000000";
        var binValue = BigInt(snowflake).toString(2);
        return binValue.length < 64
            ? cached64BitZeros.substring(0, 64 - binValue.length) + binValue
            : binValue;
    };
    /* c8 ignore start */
    /**
     * The generators epoch timestamp in milliseconds.
     *
     * Defaults to "1st of January, 2000, 00:00".
     *
     * @type {number}
     */
    /* c8 ignore end */
    Snowflake.EPOCH = Date.UTC(1970, 0, 1).valueOf();
    /* c8 ignore start */
    /**
     * The id of the shard running this generator.
     *
     * Defaults to "1".
     *
     * @type {number}
     */
    /* c8 ignore end */
    Snowflake.SHARD_ID = 1;
    /* c8 ignore start */
    /**
     * The sequence of the current running generator.
     *
     * Defaults to "1".
     *
     * @type {number}
     */
    /* c8 ignore end */
    Snowflake.SEQUENCE = 1;
    return Snowflake;
}());
exports.Snowflake = Snowflake;
//# sourceMappingURL=index.js.map