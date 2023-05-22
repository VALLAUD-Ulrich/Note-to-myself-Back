const jwt = require('jsonwebtoken');

// extraire le token du header
const extractBearer = authorization => {
  if(typeof authorization !== 'string'){
    return false;
  }
  //on isole le token
  // on isole le bear

  const match = authorization.match(/(bearer)\s+(\S+)/i);
  return match && match[2];
};

// Verification du token
const authMiddleware = {
  async checkToken(req, res, next) {
    try {
      const token = req.headers.authorization && extractBearer(req.headers.authorization);
      if(!token){
        res.status(401).json({message: 'Vous devez vous connecter pour accéder à cette ressource'});
      }
      // on verifi la validité du token
      else{
        jwt.verify(token, process.env.JWT_SECRET, (err, _) => {
          if(err){
            res.status(401).json({message: 'Votre token est invalide'});
          }
          else{
            next();
          }
        });
      }
    } catch (err) {
      console.error(err);
      res.send(err.message).status(401);
    }
  }
};

module.exports = authMiddleware;
