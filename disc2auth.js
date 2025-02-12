const router = require('express').Router();
const axios = require('axios');
const qs = require('qs');
require('dotenv').config();
const usersdb = require('./src/dbconfig/usersdb.js');

router.get('/redirect', async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) {
            return res.status(400).json({ error: "Código de autorização ausente." });
        }

        const formData = qs.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.REDIRECT_URI,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        });

        // Requisição correta para obter o token
        const output = await axios.post('https://discord.com/api/v10/oauth2/token', formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const accessToken = output.data.access_token;

        // Buscar informações do usuário
        const userInfo = await axios.get('https://discord.com/api/users/@me/guilds/965322459593199616/member', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        const userData = await axios.get('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${accessToken}`}
        });

         
        if (userInfo) {
            if (userInfo.data.roles.includes('966401440149012520')) {
                discord_role = 'member';
                const user = {
                    id: userInfo.data.user.id,  
                    name: userInfo.data.user.username,
                    avatar: userInfo.data.user.avatar,
                    discord_role: discord_role,
                    email: userData.data.email
                };
                // await usersdb.create(user);
                // res.redirect(301, '../../api/tournaments/')
                res.json(userInfo.data);
            } else {
                res.status(400).json({ error: "Usuário não encontrado" });
            }
        }
    } catch (error) {
        console.error("Erro na autenticação:", error.response?.data || error.message);
        res.status(500).json({ error: "Erro na autenticação" });
    }
});

module.exports = router;

