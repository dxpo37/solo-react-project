const db = require("../db/models")
const { Op } = require('sequelize')
const CLIENT_URL = (process.env.NODE_ENV==='development') ? "http://localhost:3000" : "https://solo-react-project.herokuapp.com/";
const AWS_URL = 'https://pikagram-pics1.s3-us-east-2.amazonaws.com/'

async function getUser(userId) { return await db.User.findByPk(userId, { attributes: ['id', 'firstName', 'lastName', 'userName', 'email', 'bio', 'profilePicPath', 'age', 'gender'] })}

async function getLogin(username, password, currentUser) {
  const { getUserToken } = require('./auth')
  if(currentUser) return currentUser
  const user = await db.User.findOne({where: {[Op.or]: [{ email: username}, { userName: username }]}})
  if (!user || !user.validatePassword(password)) return new Error("??incorrect credential sent to server??")        
  const token = getUserToken(user)
  user.token = token
  return user
}

async function addComment(userId, postId, comment ){
  if (userId) {
    const postComment = await db.Comment.create({
      userId: userId,
      postId: postId,
      comment:comment
    })
    return postComment
  } 
  else return new Error("could not post comment")
}


async function makePost(userId, caption, photoPath ){
  if (userId) {
    const postComment = await db.Post.create({
      userId: userId,
      caption: caption,
      photoPath:photoPath
    })
    return postComment
  } 
  else return new Error("could not post comment")
}


async function getPosts(userId) {  
  const followerPosts = await db.User.findByPk(userId, {
  attributes: ['id', 'userName'],
  include: [
    {
      model: db.User,
      as: 'following',
      attributes: ['id', 'userName'],
      through: { attributes: [] },
      include: {
        model: db.Post,
        as: 'posts',
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: db.User,
            as: 'user',
            attributes: ['userName', 'profilePicPath']
          },
          {
            model: db.Comment,
            attributes: ['id', 'userId', 'comment', 'createdAt'],
            order: [['createdAt', 'DESC']],
            include: {
              model: db.User,
              attributes: ['userName', 'profilePicPath']
            }
          }, {
            model: db.Like,
            attributes: ['userId'],
            include: {
              model: db.User,
              attributes: ['userName', 'profilePicPath']
            }
          }
        ],
      }
    },
    {
      model: db.Post,
      as: 'posts',
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['userName', 'profilePicPath']
        },
        {
          model: db.Comment,
          attributes: ['id', 'userId', 'comment', 'createdAt'],
          order: [['createdAt', 'DESC']],
          include: {
            model: db.User,
            attributes: ['userName', 'profilePicPath']
          }
        }, {
          model: db.Like,
          attributes: ['userId'],
          include: {
            model: db.User,
            attributes: ['userName', 'profilePicPath']
          }
        }
      ],
    }
  ],
})

const followingPosts = followerPosts.dataValues.following.flatMap((following) => following.posts)
const userPosts = followerPosts.dataValues.posts;
followingPosts.push(...userPosts)
const sortedPosts = followingPosts.sort((a, b) => b.createdAt - a.createdAt)
let string = JSON.stringify(sortedPosts)
return {allPosts: string}
}

module.exports = { makePost, getUser, getPosts, getLogin, addComment, CLIENT_URL, AWS_URL  }