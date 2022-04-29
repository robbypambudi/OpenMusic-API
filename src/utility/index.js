const AlbumMapDBToModel = ({ id, name, year }) => ({
    id,
    name,
    year,
});

const songsMapDBToModel = ({ id, title, year, genre, performer, duration, album_id }) => ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    album_id,
});

module.exports = { AlbumMapDBToModel, songsMapDBToModel };
