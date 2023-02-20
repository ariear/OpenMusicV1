/* eslint-disable quotes */
const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')
const { mapSongToModel, mapListSongToModel } = require('../../utils')
const NotFoundError = require('../../exceptions/NotFoundError')

class SongsService {
  constructor () {
    this._pool = new Pool()
  }

  async addSong ({ title, year, genre, performer, duration, albumId }) {
    const id = nanoid(16)

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan')
    }

    return result.rows[0].id
  }

  async getSongs ({ title, performer }) {
    let preText = ''
    const preValues = []

    if (title) {
      preText = ` WHERE title ILIKE '%' ||$1||'%'`
      preValues.push(title)
    }

    if (!title && performer) {
      preText = ` WHERE performer ILIKE '%' ||$1|| '%'`
      preValues.push(performer)
    }

    if (title && performer) {
      preText += ` AND performer ILIKE '%' ||$2|| '%'`
      preValues.push(performer)
    }

    const query = {
      text: `SELECT id, title, performer FROM songs ${preText}`,
      values: preValues
    }

    const result = await this._pool.query(query)
    return result.rows.map(mapListSongToModel)
  }

  async getSongById (id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id]
    }
    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan')
    }

    return result.rows.map(mapSongToModel)[0]
  }

  async editSongById (id, { title, year, genre, performer, duration, albumId }) {
    let query = {}
    if (albumId == null) {
      query = {
        text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5 WHERE id = $6 RETURNING id',
        values: [title, year, performer, genre, duration, id]
      }
    } else {
      query = {
        text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, albumId = $6 WHERE id = $7 RETURNING id',
        values: [title, year, performer, genre, duration, albumId, id]
      }
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan')
    }
  }

  async deleteSongById (id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan')
    }
  }
}

module.exports = SongsService
