const express = require("express");

const { Count } = require("../model/count");
const router = express.Router();

router.put("/", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log("IP ADDRESS:", req.body.ipAddress)
    count = new Count({
        ipAddress: req.body.ipAddress,
        continentCode: req.body.continentCode,
        continentName: req.body.continentName,
        countryCode: req.body.countryCode,
        countryName: req.body.countryName,
        stateProv: req.body.stateProv,
        city: req.body.city,
    });
    count
        .save()
        .then((count) => {
            res.send(count);
        })
        .catch((err) => {
            res.json({ message: 'Visited' })
        });

});

router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Count.countDocuments()
        .then((count) => res.json({ count }))
        .catch((err) => {
            res.status(500).send(err);
        });
});

module.exports = router;
