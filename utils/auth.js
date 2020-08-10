const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User } = require("../db/models");
const bearerToken = require("express-bearer-token");
const {getUser} = require("./utils");
const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) => {
  const userDataForToken = { id: user.id, email: user.email } 
  const token = jwt.sign( { data: userDataForToken }, secret, { expiresIn: parseInt(expiresIn, 10) } )
  return token
}

const restoreUser = (req, res, next) => {  
  const { token } = req
  if (!token)  return next() 

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) { err.status = 401;  return next(err) }
    const { id } = jwtPayload.data;
    try { req.user = await User.findByPk(id) } 
    catch (e) { return next(e) }
    if (!req.user) return res.set("WWW-Authenticate", "Bearer").status(401).end()
    return next()
  })
}

const restoreOAuthUser = async (req, res, next) => {  
  const email = req.user.emails[0].value
  let user = await User.findAll({where: { email }})
  const token = getUserToken(user)
  if(user[0]) res.json({token})
  else{
    const user = await User.create({
      firstName : req.user.name.givenName,
      lastName : req.user.name.familyName,
      userName : req.user.name.givenName,
      email,
      hashedPassword : "none"
    })
    const token = getUserToken(user)
    res.json({token})
  }
}



const requireAuth = [bearerToken(), restoreUser];

module.exports = { getUserToken, requireAuth , restoreOAuthUser};
