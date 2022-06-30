const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

const db = require('./models');

db.sequelize.authenticate().then(() => {
  console.log("Connected to SMTTerms.")
}).catch(err => {
  console.log("Unable to connect", err);
});

require("./routes/routes")(app);
const {body, validationResult } = require("express-validator");

const validate = () => {
  return [
      body("name").not().isEmpty().matches(/^[A-Za-z-\s]+$/),
      body("phone").isEmpty().isNumeric().isLength({ min: 8, max: 20 })
  ]
}

app.post('/addBonaqua', validate(), (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  else {
    res.json({
      success: true
    })
  }
})

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});