var router = require('express').Router();

router.get('/', (req, res, next) => {
  //res.render('../views/index.html');
  res.render('../../src/index.html');
});

module.exports = router;
