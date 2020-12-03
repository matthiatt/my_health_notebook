const router = require('express').Router();
let Reminder = require('../models/reminder.model');

router.route('/').get((req,res) => {
    Reminder.find()
    .then(reminders => res.json(reminders))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username: req.body.username;
    const description: req.body.description;
    const reminder: Number(req.body.reminder);
    const date: Date.parse(req.body.date);

    const newReminder = new Reminder({
        username,
        description,
        reminder,
        date,
    });

    newReminder.save()
    .then(() => res.json('Reminder added!'))
    .catch(err => res.status(400).json('Error: + err'));
});

module.exports = router; 