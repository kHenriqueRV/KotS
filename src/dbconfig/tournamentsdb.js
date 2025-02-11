const { randomUUID } = require('node:crypto');
const sql = require('./db.js');

const tournamentsdb = {

    async list() {
        const result = await sql`SELECT * FROM tournaments`;
        return result;
    },

    async create(tournament) {
        const id = randomUUID();
        await sql`
        INSERT INTO tournaments (id, tittle, description, photo , participants) 
        VALUES (${id}, ${tournament.tittle}, ${tournament.description},${tournament.photo} ,${tournament.participants}) 
        `
    },

    async update(id, tournament) {
        await sql`
        UPDATE tournaments
        SET tittle = ${tournament.tittle}, description = ${tournament.description}, photo = ${tournament.photo}, participants = ${tournament.participants}
        WHERE id = ${id}
        `

    },
    async delete(id) {
        await sql`
        DELETE FROM tournaments
        WHERE id = ${id}`
    }
}


module.exports = tournamentsdb;