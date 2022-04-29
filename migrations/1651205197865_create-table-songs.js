/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable("songs", {
        id: {
            type: "VARCHAR(26)",
            notNull: true,
            UNIQUE: true,
        },
        title: {
            type: "VARCHAR(32)",
            notNull: true,
        },
        year: {
            type: "integer",
            notNull: true,
        },
        genre: {
            type: "VARCHAR(32)",
            notNull: true,
        },
        performer: {
            type: "VARCHAR(32)",
            notNull: true,
        },
        duration: {
            type: "integer",
        },
        album_id: {
            type: "VARCHAR(36)",
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("songs");
};
