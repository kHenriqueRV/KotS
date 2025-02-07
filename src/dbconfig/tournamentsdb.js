const { randomUUID } = require('node:crypto');

const tournamentsdb = {
    tournaments: new Map(),

    list () {
        return Array.from(this.tournaments.values());
    },

    create(tournament) {
        const tournamentID = randomUUID();
        this.tournaments.set(tournamentID, tournament);
}}

module.exports = tournamentsdb;