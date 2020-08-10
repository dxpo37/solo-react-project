const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User } = require("../db/models");
const bearerToken = require("express-bearer-token");
const {getUser} = require("./utils");
const { secret, expiresIn } = jwtConfig;

const getUserToken= (user) => {
  const userDataForToken = { id: user.id, email: user.email }
  const token = jwt.sign({ data: userDataForToken }, secret, { expiresIn: parseInt(expiresIn, 10) } )
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
  console.log(req.body)
  const  {sW:firstName, sU:lastName, yu:email } = req.body.Ot
 
  let user = await User.findAll({where: { email }})

  
  if(user[0]) { const token = getUserToken(user[0].dataValues); res.json({token}) }
  else{
    let user = await User.create({
      firstName,
      lastName,
      userName: firstName,
      email,
      hashedPassword : "none"
    })
    const token = getUserToken(user[0].dataValues)
    console.log(token)
    res.json({token})
  }

}

const requireAuth = [bearerToken(), restoreUser];

module.exports = {getUserToken , requireAuth, restoreOAuthUser}
