const OpenMusicSongHandler = require("./handler");
const routes = require("./routes");

module.exports = {
    name: "openmusic-songs",
    version: "1.0.0",
    register: async (server, { service, validator }) => {
        const songhandler = new OpenMusicSongHandler(service, validator);
        await server.route(routes(songhandler));
    },
};
