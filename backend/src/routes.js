const route = require('express').Router();
const jwt = require('jsonwebtoken');

const UserController = require('./controllers/UserController');

route.post('/login', UserController.login);
route.post('/register', UserController.create);
route.post('/refresh', UserController.refreshToken);
route.post('/logout', UserController.logout);

route.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) return res.status(401).json({ error: 'No token provided' });

  const [schema, token] = authHeader.split(' ');

  if(schema !== 'Bearer') return res.status(401).json({ error: 'Token malformatted' });

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if(err) return res.status(401).json({ error: 'Invalid token' });

    req.userId = decoded.id;
    return next();
  });
});

route.get('/user', UserController.index);
route.put('/user', UserController.update);
route.delete('/user', UserController.delete);


module.exports = route;
