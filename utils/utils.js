const db = require("../db/models")
const { getUserToken, requireAuth } = require("../utils/auth")
const { Op } = require('sequelize')

async function getUser(userId) { return await db.User.findByPk(userId, { attributes: ['id', 'firstName', 'lastName', 'userName', 'email', 'bio', 'profilePicPath', 'age', 'gender'] })}

async function getLogin(username, password) {

  const user = await db.User.findOne({where: {[Op.or]: [{ email: username}, { userName: username }]}})
  if (!user || !user.validatePassword(password)) return new Error("??incorrect credential sent to server??")        
  const token = getUserToken(user);
  const id = user.id
  return {token,id}

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




module.exports = {getUser, getPosts, getLogin, addComment}