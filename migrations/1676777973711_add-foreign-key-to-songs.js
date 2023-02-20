/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.sql("INSERT INTO songs(id, title, year, performer, genre, duration, albumId) VALUES ('old_songs', 'old_songs', 2004, 'old songs', 'old songs', 100, 'old_songs')")

  pgm.sql("UPDATE songs SET albumId = 'old_songs' WHERE albumId IS NULL")

  pgm.addConstraint('songs', 'fk_songs.album_albums.id', 'FOREIGN KEY(albumId) REFERENCES albums(id) ON DELETE CASCADE')
}

exports.down = pgm => {}
