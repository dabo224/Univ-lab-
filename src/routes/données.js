const {User,PostImage, Post, Like ,Comment,Profil} = require('../db/sequelize');
const Sequelize = require('sequelize');
const postImages = require('../models/postImages');



module.exports = (app) => {

    app.get('/data/:userId', (req, res) => {
        const userId = req.params.userId; // 🔹 Récupère l'ID de l'utilisateur depuis l'URL
      
        User.findOne({
            where: { id: userId },
            include: [
                {
                    model: Profil,
                    attributes: ['id','urlPhoto']
                },
                {
                    model: Post,
                    attributes: [],
                    include: [
                        {
                            model : PostImage,
                            attributes : ['id','urlPhoto']
                        },
                        {
                            model : User,
                            attributes : [],
                            include : [
                                {
                                    model : Profil,
                                    attributes : ['id','urlPhoto']
                                }
                            ]
                        },
                        {
                            model: Like,
                            attributes: ['id'],
                            include :[{
                                model : User,
                                attributes : ['id']
                            }]
                        },
                        {
                            model: Comment,
                            attributes: ['id', 'contenu', 'userId', 'postId', 'createdAt'],
                            include: [{
                                model: User,
                                attributes: ['id', 'nom', 'prenom'],
                                include : [{
                                    model : Profil,
                                    attributes : ['id','urlPhoto']
                                }]
                            }]
                        }
                    ]
                }
            ],
            distinct: true  // 🔹 Ajoute ça au lieu du group
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouvé" }); // 🔹 Vérifie si l'utilisateur existe
            }
            res.json({user});
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
      });
      

}