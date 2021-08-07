var express = require("express");
var router = express.Router();

/* MIDDLEWARE FUNCTIONS */

const myLogger = function (req, res, next) {
  console.log("logged");
  next();
};

var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

/* END OF MIDDLEWARE FUNCTIONS */

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/:id", requestTime, function (req, res, next) {
  res.send(`respond with a user with the id ${req.params.id}
    with request time of ${req.requestTime}`);
});

module.exports = router;
