const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("hn ye chla to hai")
    return next();
  }
  res.redirect('/login');
};

export default isAuthenticated;

ac

// src/middleware/authenticateJwt.js
// import passport from 'passport';

// export default passport.authenticate('jwt', { session: false });
