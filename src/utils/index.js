const mapAlbumToModel = ({
  id,
  name,
  year
}) => ({
  id,
  name,
  year
})

const mapSongToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId
})

const mapListSongToModel = ({
  id,
  title,
  performer
}) => ({
  id,
  title,
  performer
})

module.exports = { mapAlbumToModel, mapSongToModel, mapListSongToModel }
