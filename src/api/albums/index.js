const OpenMusicHandler = require("./handler");
const routes = require("./routes");

module.exports = {
    name: "openmusic-albums",
    version: "1.0.0",
    register: async (server, { service, validator }) => {
        const OPMHandler = new OpenMusicHandler(service, validator);
        await server.route(routes(OPMHandler));
    },
};
