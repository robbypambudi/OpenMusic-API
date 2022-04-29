const InvariantError = require("../exceptions/invariantError");

const { AlbumsPayloadSchema, SongsPayloadSchema } = require("./schema");

const OpenMusicAlbums_Validator = {
    validateAlbumsPayload: (payload) => {
        const validateResult = AlbumsPayloadSchema.validate(payload);
        if (validateResult.error) {
            throw new InvariantError(validateResult.error.message);
        }
    },
};

const OpenMusicSongs_Validator = {
    validateSongsPayload: (payload) => {
        const validateResult = SongsPayloadSchema.validate(payload);
        if (validateResult.error) {
            throw new InvariantError(validateResult.error.message);
        }
    },
};

module.exports = { OpenMusicAlbums_Validator, OpenMusicSongs_Validator };
