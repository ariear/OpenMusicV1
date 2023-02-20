/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    title: {
      type: 'TEXT',
      notNull: true
    },
    year: {
      type: 'INT',
      notNull: true
    },
    performer: {
      type: 'TEXT',
      notNull: true
    },
    genre: {
      type: 'TEXT',
      notNull: true
    },
    duration: {
      type: 'INT',
      notNull: false
    },
    albumId: {
      type: 'VARCHAR(50)',
      notNull: false
    }
  })

  // pgm.addConstraint('songs', 'fkey_songs_albums', 'FOREIGN KEY("albumId") REFERENCES albums(id)')
}

exports.down = pgm => {
  // pgm.dropConstraint('songs', 'fkey_songs_albums')
  pgm.dropTable('songs')
}
