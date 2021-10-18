var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/user', function (req, res, next) {
  res.render('user', { title: 'Express' });
});
router.post(
  '/user',

  check('username').isLength({ min: 3 }),
  check('password').isLength({ min: 5 }),
  check('email').isEmail(),
  check('rpassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
  function (req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
    }
    else {
      res.send("working and validation done");
    }

  });
module.exports = router;
