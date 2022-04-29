const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/invariantError.js");
const NotFoundError = require("../../exceptions/NotFoundError.js");
const { AlbumMapDBToModel } = require("../../utility/index.js");

class AlbumService {
    constructor() {
        this._pool = new Pool();
    }

    async addAlbum({ name, year }) {
        const id = "album-" + nanoid(16);

        const query = {
            text: "INSERT INTO album (id, name, year) VALUES ($1, $2, $3) RETURNING id",
            values: [id, name, year],
        };
        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError("Gagal menambahkan album");
        }
        return result.rows[0].id;
    }

    async getAlbum(albumId) {
        const query = {
            text: "SELECT * FROM album WHERE id = $1",
            values: [albumId],
        };
        let result = await this._pool.query(query);

        if (!result.rows[0]) {
            throw new NotFoundError("Album tidak ditemukan");
        }

        // Get AlbumId
        const querySongs = {
            text: "SELECT * FROM songs WHERE album_id = $1",
            values: [albumId],
        };
        const resultSongs = await this._pool.query(querySongs);

        result = {
            ...result.rows[0],
            songs: resultSongs.rows,
        };
        console.log(result);

        return result;
    }

    async updateAlbum(albumId, { name, year }) {
        const query = {
            text: "UPDATE album SET name = $1, year = $2 WHERE id = $3 RETURNING *",
            values: [name, year, albumId],
        };
        const result = await this._pool.query(query);
        if (!result.rows[0]) {
            throw new NotFoundError("Album tidak ditemukan");
        }
    }

    async deleteAlbum(albumId) {
        // Search albumId
        const Find = {
            text: "SELECT * FROM album WHERE id = $1",
            values: [albumId],
        };
        const result = await this._pool.query(Find);
        if (!result.rows[0]) {
            throw new NotFoundError("Album tidak ditemukan");
        }

        const query = {
            text: "DELETE FROM album WHERE id = $1",
            values: [albumId],
        };
        await this._pool.query(query);
    }
}

module.exports = AlbumService;
