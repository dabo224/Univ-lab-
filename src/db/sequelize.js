const {Sequelize, DataTypes} = require('sequelize')
const UserModel = require('../models/user')
const postModel= require('../models/post')
const LikeModel = require('../models/likes')
const CommentModel = require('../models/comments')
const NotificationModel = require('../models/notifications')
const ObjetPerduModel = require('../models/objetsPerdus')
const ProfilModel = require('../models/profil')
const friendShipModel = require('../models/friendShip')
const postImageModel = require('../models/postImages')
const nblikeModel = require('../models/nblike')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize ('Université','root','',{

  dialect : 'mariadb',
  host : 'localhost',
  logging : false
})
password = 'abdoulaye'

const User = UserModel(sequelize,DataTypes)
const Post = postModel(sequelize,DataTypes)
const Like = LikeModel(sequelize,DataTypes)
const Comment = CommentModel(sequelize,DataTypes)
const Notification = NotificationModel(sequelize,DataTypes)
const ObjetsPerdus = ObjetPerduModel(sequelize,DataTypes)
const Profil = ProfilModel(sequelize,DataTypes)
const Friendship = friendShipModel(sequelize,DataTypes)
const PostImage = postImageModel(sequelize,DataTypes)
const NbLike = nblikeModel(sequelize,DataTypes)





const initDB = () => {
  sequelize.sync({force : false})
  .then(()=> {
    User.hasMany(Post, { foreignKey: 'userId' , onDelete: 'CASCADE'});
    Post.belongsTo(User, { foreignKey: 'userId' });

    User.hasOne(Profil, { foreignKey: { name: 'userId', unique: true }, onDelete: 'CASCADE'});
    Profil.belongsTo(User, { foreignKey: 'userId' });
    
    User.hasMany(Comment, { foreignKey: 'userId',onDelete : 'CASCADE' });
    Comment.belongsTo(User, { foreignKey: 'userId' });

    User.hasMany(Like, { foreignKey: 'userId',onDelete : 'CASCADE' });
    Like.belongsTo(User, { foreignKey: 'userId' });
    
    Post.hasOne(PostImage, { foreignKey: { name: 'postId', unique: true }, onDelete: 'CASCADE'});
    PostImage.belongsTo(Post, { foreignKey: 'postId' });

    Post.hasOne(NbLike, { foreignKey: { name: 'postId', unique: true }, onDelete: 'CASCADE'});
    NbLike.belongsTo(Post, { foreignKey: 'postId' });


    Post.hasMany(Comment, { foreignKey: 'postId' ,onDelete:'CASCADE'});
    Comment.belongsTo(Post, { foreignKey: 'postId' });

    Post.hasMany(Like, { foreignKey: 'postId', onDelete : 'CASCADE'});
    Like.belongsTo(Post, { foreignKey: 'postId' });

    User.hasMany(ObjetsPerdus, { foreignKey: 'userId', onDelete: 'CASCADE' });
    ObjetsPerdus.belongsTo(User, { foreignKey: 'userId' });

    User.belongsToMany(User, { through: Friendship, as: 'Friends', foreignKey: 'userId', otherKey: 'friendId' });
    User.belongsToMany(User, { through: Friendship, as: 'FriendOf', foreignKey: 'friendId', otherKey: 'userId' });

    console.log('la bien de donnée a bien été syncronisé')
    // User.create({
    //   nom:'dabo',
    //   prenom : 'abdoulaye',
    //   email : 'abdoulaye@gmail.com',
    //   password : 'abdoulaye'
    // })
    // User.create({
    //   nom:'kolie',
    //   prenom:'augustin',
    //   email:'kolie.org',
    //   password:'kolie'
    // })
    // Post.create({
    //   titre : 'djmsdjm',
    //   contenu : 'jdldjqdj',
    //   image : 'jdjdjddmjfj',
    //   userID : 1
    // })
    // Post.create({
    //   titre : 'djmsdjm',
    //   contenu : 'jdldjqdj',
    //   image : 'jdjdjddmjfj',
    //   userID : 2

    // })
    // Like.create({
    //   postId : 2
    // }),
    // Comment.create({
    //   contenu : 'jddjdjfdjd',
    //   PostId : 1,
    //   UserId : 1
    // }),
    // Profil.create({
    //   urlPhoto : 'djdjdj',
    //   userId : 1

    // }),
    // User.create({
    //   nom:'dabo',
    //   prenom : 'hadiatou',
    //   email : 'hadiatou@gmail.com',
    //   password : 'abdcd'
    // })
    // Friendship.create({
    //   userId :1,
    //   friendId : 2
    // }),
    // Friendship.create({
    //   userId :1,
    //   friendId : 3
    // })
  })

  .catch((err) => {
    console.error(`Erreur lors de l'initialisation de la base de données`,err)
  })
}


module.exports = {initDB,User,Like,Post,Comment,Notification,ObjetsPerdus,Profil,PostImage}