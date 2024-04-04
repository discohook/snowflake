export declare class Snowflake {
    /**
     * The generators epoch timestamp in milliseconds.
     *
     * Defaults to "1st of January, 2000, 00:00".
     *
     * @type {number}
     */
    static EPOCH: number;
    /**
     * The id of the shard running this generator.
     *
     * Defaults to "1".
     *
     * @type {number}
     */
    static SHARD_ID: number;
    /**
     * The sequence of the current running generator.
     *
     * Defaults to "1".
     *
     * @type {number}
     */
    static SEQUENCE: number;
    /**
     * Generates a single snowflake.
     * @param {Date|number} [timestamp = Date.now] - Timestamp to generate from
     * @param {number} [shard_id = Snowflake.SHARD_ID] - Shard ID for the snowflake
     * @param {Date|number} [epoch = Snowflake.EPOCH] - Epoch for the snowflake
     * @returns {string}
     */
    static generate({ timestamp, shard_id, epoch, }?: {
        timestamp?: Date | number;
        shard_id?: number;
        epoch?: Date | number;
    }): string;
    /**
     * Deconstruct a snowflake to its values using the `Generator.epoch`.
     * @param {SnowflakeResolvable} snowflake - Snowflake to deconstruct
     * @param {Date|number} epoch - The epoch of the snowflake
     * @returns {DeconstructedSnowflake}
     */
    static parse(snowflake: SnowflakeResolvable, epoch?: Date | number): DeconstructedSnowflake;
    static isValid(snowflake: string): boolean;
    /**
     * Extract bits and their values from a snowflake.
     * @param {SnowflakeResolvable} snowflake - Snowflake to extract from
     * @param {number|bigint} start - Number of bits to shift before extracting
     * @param {number|bigint} length - Number of bits to extract before stopping
     * @returns {bigint}
     */
    static extractBits(snowflake: SnowflakeResolvable, start: number, length?: number): number;
    /**
     * Transform a snowflake into its 64Bit binary string.
     * @param {SnowflakeResolvable} snowflake - Snowflake to transform
     * @returns {string}
     * @private
     */
    static binary(snowflake: SnowflakeResolvable): string;
}
/**
 * Resolvable value types for a valid Snowflake.
 * * string
 * * number
 * * bigint
 * @type {SnowflakeResolvable}
 */
declare type SnowflakeResolvable = string;
/**
 * Interface of a Snowflake after `Generator.deconstruct()`.
 * @property {bigint} snowflake - Snowflake deconstructed from
 * @property {bigint} timestamp - The timestamp the snowflake was generated
 * @property {bigint} shard_id - The shard_id used when generating
 * @property {bigint} increment - The increment of this snowflake
 * @property {string} binary - The 64Bit snowflake binary string
 * @interface DeconstructedSnowflake
 */
interface DeconstructedSnowflake {
    timestamp: number;
    shard_id: number;
    sequence: number;
    binary: string;
}
export {};
//# sourceMappingURL=index.d.ts.map