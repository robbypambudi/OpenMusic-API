const { Pool } = require("pg");
const NotFoundError = require("../../exceptions/NotFoundError.js");
const { SongMapDBToModel } = require("../../utility/index.js");

class SongsService {
    constructor() {
        this._pool = new Pool();
    }

    async addSong({ id, title, year, genre, performer, duration, albumId }) {
        const query = {
            text: "INSERT INTO songs (id, title, year, genre, performer, duration, album_id) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING id",
            values: [id, title, year, genre, performer, duration, albumId],
        };
        const result = await this._pool.query(query);
        return result.rows[0].id;
    }

    async getSongs({ title, performer }) {
        if (title && performer) {
            const query = {
                // Select *from songs where LOWER(title) like LOWER('%title%') and LOWER(performer) like LOWER('%performer%')
                text: "SELECT id, title, performer FROM songs WHERE LOWER(title) like LOWER($1) and LOWER(performer) like LOWER($2)",
                values: [`%${title}%`, `%${performer}%`],
            };
            const result = await this._pool.query(query);
            return result.rows;
        }
        if (title) {
            // Where title  LIKE '%title%'
            const query = {
                text: "SELECT id, title, performer FROM songs WHERE LOWER(title) LIKE LOWER($1) ",
                values: ["%" + title + "%"],
            };

            const result = await this._pool.query(query);
            // console.log(query);
            return result.rows;
        }
        if (performer) {
            const query = {
                text: "SELECT id, title, performer FROM songs WHERE LOWER(performer) LIKE LOWER($1) ",
                values: ["%" + performer + "%"],
            };
            const result = await this._pool.query(query);
            return result.rows;
        }

        const query = {
            text: "SELECT id, title, performer FROM songs ",
        };
        const result = await this._pool.query(query);
        return result.rows;
    }

    async getSongsById(songId) {
        const query = {
            text: "SELECT * FROM songs WHERE id = $1 ",
            values: [songId],
        };
        const result = await this._pool.query(query);
        if (!result.rows[0]) {
            throw new NotFoundError("Song tidak ditemukan");
        }
        return result.rows[0];
    }

    async updateSong(songId, { title, year, genre, performer, duration, albumId }) {
        const find = {
            text: "SELECT * FROM songs WHERE id = $1",
            values: [songId],
        };
        const result = await this._pool.query(find);
        if (!result.rows[0]) {
            throw new NotFoundError("Song tidak ditemukan");
        }
        const query = {
            text: "UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 WHERE id = $7",
            values: [title, year, genre, performer, duration, albumId, songId],
        };
        await this._pool.query(query);
    }

    async deleteSong(songId) {
        const find = {
            text: "SELECT * FROM songs WHERE id = $1",
            values: [songId],
        };
        const result = await this._pool.query(find);

        if (!result.rows[0]) {
            throw new NotFoundError("Song tidak ditemukan");
        }
        const query = {
            text: "DELETE FROM songs WHERE id = $1",
            values: [songId],
        };
        await this._pool.query(query);
    }
}

module.exports = SongsService;
