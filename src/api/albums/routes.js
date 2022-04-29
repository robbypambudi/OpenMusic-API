const routes = (handler) => [
    {
        method: "POST",
        path: "/albums",
        handler: handler.addAlbumsHandler,
    },
    {
        method: "GET",
        path: "/albums/{id}",
        handler: handler.getAlbumHandler,
    },
    {
        method: "PUT",
        path: "/albums/{id}",
        handler: handler.updateAlbumHandler,
    },
    {
        method: "DELETE",
        path: "/albums/{id}",
        handler: handler.deleteAlbumHandler,
    },
];

module.exports = routes;
