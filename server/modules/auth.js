module.exports = function (req) {
  if (req.session.user) return true
  else return false
};
