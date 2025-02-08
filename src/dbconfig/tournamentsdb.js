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

    update(id, tournament) {
        if (this.tournaments.has(id)) {
            this.tournaments.set(id, tournament);
        }
    },
    delete(id) {
        this.tournaments.delete(id);
    }
}


module.exports = tournamentsdb;