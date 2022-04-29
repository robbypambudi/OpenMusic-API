const routes = (handler) => [
    {
        method: "POST",
        path: "/songs",
        handler: handler.addSongsHandler,
    },
    {
        method: "GET",
        path: "/songs",
        handler: handler.getSongsHandler,
    },
    {
        method: "GET",
        path: "/songs/{id}",
        handler: handler.getSongByIdHandler,
    },
    {
        method: "PUT",
        path: "/songs/{id}",
        handler: handler.updateSongHandler,
    },
    {
        method: "DELETE",
        path: "/songs/{id}",
        handler: handler.deleteSongHandler,
    },
];
module.exports = routes;
