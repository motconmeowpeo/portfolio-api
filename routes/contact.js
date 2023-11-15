const express = require("express");

const { Contact } = require("../model/contact");
const router = express.Router();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


router.post("/", async (req, res) => {
    contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
        resolved: false,
        createAt: new Date()
    });
    const msg = {
        to: req.body.email,
        from: 'nika.n@itcgroup.io',
        subject: "THANK FOR YOUR CONTACT",
        html: `
        <h1>Dear ${req.body.name || req.body.email} </h1>
        <h4>I'm glad you care about me.</h4></br>
        <h4>I will send a response within 1 to 2 days.</h4></br>
        <h4>If you need this urgently, please call me: 0334829504</h4></br>
        <h3>Best regards,</h3>
        `
    };
    contact
        .save()
        .then((contact) => {
            res.send(contact);
            sgMail.send(msg);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    Contact.find()
        .sort({ createAt: -1 })
        .then((contact) => res.send(contact))
        .catch((err) => {
            res.status(500).send(err);
        });
});

//delete
router.post("/delete", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const id = req.body.id;
    const contact = await Contact.findByIdAndRemove(id);
    if (!contact) res.status(404).send("Not found");
    else {
        res.send(contact);
    }
});

module.exports = router;
