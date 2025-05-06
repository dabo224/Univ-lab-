const { User } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/users/:userId/friends', async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = await User.findByPk(userId, {
                include: [{
                    model: User,
                    as: 'Friends',
                    attributes: ['id', 'nom', 'prenom', 'email'],
                    through: {
                        attributes: []
                    }
                }]
            });

            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            res.json(user.Friends);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};