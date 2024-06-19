const express = require('express');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();
router.get('/profile', authenticate, (req, res) => {
  let jso=req.user;
  jso.status=1;
  res.json(jso);
});

module.exports = router;
