function authRole(role) {
  return (req, res, next) => {
    if (req.user && !(req.user.role === role)) {
      res.status(401);
      return res.sendFile("not_allowed.html", { root: "./public/html" });
    }

    next();
  };
}

module.exports  = authRole;
