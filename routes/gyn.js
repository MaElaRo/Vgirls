const express = require("express");
const router = express.Router();
const Gyn = require("../models/Gyn");

router.get("/", (req, res) => {
  Gyn.find()
    .then(gyns => {
      res.json(gyns);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const { name, address, phoneNumber } = req.body;

  Gyn.findById(id)

    .then(gyn => {
      res.json(gyn);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/add-gyn", (req, res, next) => {
  const { name, address, phoneNumber } = req.body;
  Gyn.create({
    name,
    address,
    phoneNumber
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => res.json(err));
});

module.exports = router;
