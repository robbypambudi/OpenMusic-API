const InvariantError = require("../../exceptions/invariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class OpenMusicHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        // Prototype methods
        this.addAlbumsHandler = this.addAlbumsHandler.bind(this);
        this.getAlbumHandler = this.getAlbumHandler.bind(this);
        this.updateAlbumHandler = this.updateAlbumHandler.bind(this);
        this.deleteAlbumHandler = this.deleteAlbumHandler.bind(this);
    }

    async addAlbumsHandler(request, h) {
        try {
            this._validator.validateAlbumsPayload(request.payload);
            const { name, year } = request.payload;
            // Validator
            const album_id = await this._service.addAlbum({ name, year });

            const response = h.response({
                status: "success",
                data: {
                    albumId: album_id,
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
            return h
                .response({
                    status: "error",
                    message: "Maaf, Terjadi Kesalahan pada Server Kami",
                })
                .code(500);
        }
    }

    async getAlbumHandler(request, h) {
        try {
            const { id } = request.params;
            const album = await this._service.getAlbum(id);

            const response = h.response({
                status: "success",
                data: {
                    album: album,
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
            console.log(error.message);

            return h
                .response({
                    status: "error",
                    message: "Maaf Terjadi Kesalahan Pada Server Kami",
                })
                .code(500);
        }
    }

    async updateAlbumHandler(request, h) {
        try {
            this._validator.validateAlbumsPayload(request.payload);
            const { id } = request.params;
            const { name, year } = request.payload;
            await this._service.updateAlbum(id, { name, year });

            const response = h.response({
                status: "success",
                message: "Album updated",
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
            return h
                .response({
                    status: "error",
                    message: "Maaf Terjadi Kesalahan Pada Server Kami",
                })
                .code(500);
        }
    }

    async deleteAlbumHandler(request, h) {
        try {
            const { id } = request.params;
            await this._service.deleteAlbum(id);

            const response = h.response({
                status: "success",
                message: "Album deleted",
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
                    message: "Maaf Terjadi Kesalahan Pada Server Kami",
                })
                .code(500);
        }
    }
}
module.exports = OpenMusicHandler;
