require("dotenv").config();

// API
const OpenMusic_Albums = require("./api/albums/index");
const OpenMusic_Songs = require("./api/songs/index");

// Services
const AlbumService = require("./service/postgres/AlbumService");
const SongsService = require("./service/postgres/SongsService");

// Validator
const { OpenMusicAlbums_Validator, OpenMusicSongs_Validator } = require("./validator/index");

// Hapi
const Hapi = require("@hapi/hapi");
const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    });

    await server.register([
        {
            plugin: OpenMusic_Albums,
            options: {
                service: new AlbumService(),
                validator: OpenMusicAlbums_Validator,
            },
        },
        {
            plugin: OpenMusic_Songs,
            options: {
                service: new SongsService(),
                validator: OpenMusicSongs_Validator,
            },
        },
    ]);

    await server.start();
    console.log("Server running on %s", server.info.uri);
};

init();
