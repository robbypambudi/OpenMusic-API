const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/invariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class OpenMusicSongHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.addSongsHandler = this.addSongsHandler.bind(this);
        this.getSongsHandler = this.getSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.updateSongHandler = this.updateSongHandler.bind(this);
        this.deleteSongHandler = this.deleteSongHandler.bind(this);
    }

    async addSongsHandler(request, h) {
        try {
            await this._validator.validateSongsPayload(request.payload);

            const id = "song-" + nanoid(16);
            const { title, year, genre, performer, duration, albumId } = request.payload;
            const song_id = await this._service.addSong({
                id,
                title,
                year,
                genre,
                performer,
                duration,
                albumId,
            });

            const response = h.response({
                status: "success",
                data: {
                    songId: song_id,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof InvariantError) {
                return h
                    .response({
                        status: "fail",
                        message: error.message,
                    })
                    .code(400);
            }
            // console.log(error.message);
            return h
                .response({
                    status: "error",
                    message: "Maaf Terjadi Kesalahan pada Server Kami",
                })
                .code(500);
        }
    }
    async getSongsHandler(request) {
        const { title, performer } = request.query;

        const songs = await this._service.getSongs({ title, performer });
        return {
            status: "success",
            data: {
                songs,
            },
        };
    }

    async getSongByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const song = await this._service.getSongsById(id);

            const response = h.response({
                status: "success",
                data: {
                    song: song,
                },
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof NotFoundError) {
                return h
                    .response({
                        status: "fail",
                        message: error.message,
                    })
                    .code(404);
            }
            return h
                .response({
                    status: "error",
                    message: "Maaf, Terjadi Kesalahan pada Server Kami",
                })
                .code(500);
        }
    }

    async updateSongHandler(request, h) {
        try {
            this._validator.validateSongsPayload(request.payload);
            const { id } = request.params;
            const { title, year, genre, performer, duration, albumId } = request.payload;
            const song = await this._service.updateSong(id, {
                title,
                year,
                genre,
                performer,
                duration,
                albumId,
            });

            const response = h.response({
                status: "success",
                message: "Song updated",
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof InvariantError) {
                return h
                    .response({
                        status: "fail",
                        message: error.message,
                    })
                    .code(400);
            } else if (error instanceof NotFoundError) {
                return h
                    .response({
                        status: "fail",
                        message: error.message,
                    })
                    .code(404);
            }

            console.log(error.message);
            return h
                .response({
                    status: "error",
                    error: "Maaf, Terjadi Kesalahan pada Server Kami",
                })
                .code(500);
        }
    }
    async deleteSongHandler(request, h) {
        try {
            const { id } = request.params;
            const song = await this._service.deleteSong(id);

            const response = h.response({
                status: "success",
                message: "Song deleted",
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof NotFoundError) {
                return h
                    .response({
                        status: "fail",
                        message: error.message,
                    })
                    .code(404);
            }
            return h
                .response({
                    status: "error",
                    error: error.message,
                })
                .code(400);
        }
    }
}
module.exports = OpenMusicSongHandler;
