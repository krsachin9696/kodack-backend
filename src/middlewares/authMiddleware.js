const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

export default isAuthenticated;



// src/middleware/authenticateJwt.js
// import passport from 'passport';

// export default passport.authenticate('jwt', { session: false });
