/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("album", {
        id: {
            type: "VARCHAR(36)",
            notNull: true,
            UNIQUE: true,
        },
        name: {
            type: "VARCHAR(32)",
            notNull: true,
        },
        year: {
            type: "integer",
            notNull: true,
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("album");
};
