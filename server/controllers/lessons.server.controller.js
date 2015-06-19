exports.list = function(req, res, next) {
  res.json({
    id: 1,
    title: 'Lesson 1',
    description: 'Description for lesson 1',
    content: 'Content for lesson 1. Lots of text here (markdown)',
  })
};