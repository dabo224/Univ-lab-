const {User,Notification} = require('../db/sequelize')

module.exports =  (app)=>{
    app.post('/notif',async (req,res) =>{
        const {senderId,userID} = req.body

        const vu = await User.findByPk(userID)
        const vs =await User.findByPk(senderId)

        if(vu && vs){
            Notification.create({
                contenu : 'demande d\'ami ',
                userID,
                senderId
            })
            .then(()=> {
                return res.status(200)
            })
        }
        else if(vu && !vs){
            return res.json({error : `votre id n'existe pas dans la base de donnée`})
        }
        else if (!vu && vs){
            return res.status(404).json({error : `Cet utilisateur n'existe pa`})

        }
        else{
            return res.status(400).json({error : `Erreur veuillez réessayer plus tard`})

        }
    })
}