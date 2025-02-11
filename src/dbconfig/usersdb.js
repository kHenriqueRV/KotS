const sql = require('./db.js');

const usersdb = {

    async create (user) {
        await sql`
            INSERT INTO users (id, name, avatar, discord_role, email) 
            VALUES (${user.id}, ${user.name}, ${user.avatar}, ${user.discord_role}, ${user.email}) 
        `
    },
};

module.exports = usersdb;