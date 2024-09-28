import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).send({
        error: 'Please authenticate',
      });
    }

    const actualToken = token.replace('Bearer ', '');
    const decoded = jwt.verify(actualToken, process.env.Token_key);
    req.user = decoded; 

    next(); 
  } catch (error) {
    res.status(401).send({
      error: 'Please authenticate',
    });
  }
};
