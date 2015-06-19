exports.list = function(req, res, next) {
  res.json({
    id: 1,
    name: 'Batman',
    email: 'batman@gotham.gov',
    password: 'd4rkn1gh7'
  });
};