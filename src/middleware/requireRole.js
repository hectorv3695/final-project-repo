const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User is not authenticated.' });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: 'User is not authorized.' });
    }

    next();
  };
};

export default requireRole;