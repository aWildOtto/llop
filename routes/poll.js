"use strict";
const express = require('express');
const router = express.Router();
var sendgrid = require('sendgrid');
const uuid = require('uuid/v4');
//-----------------utilities-----------------------
function zip(a, b) {
  return a.map(function (e, i) {
    return [e, b[i]];
  });
}

module.exports = (dbHelper, env) => {

  router.get("/", (req, res) => {
    res.render('index');
  });

  router.post('/', (req, res) => {
    var email = sendgrid(env.SENDGRID_API);
    console.log("question:", req.body.question,
      "creator_name:", req.body.creator_name,
      "email:", req.body.creator_email,
      "background_path", req.body.background_path,
      "anonymous:", req.body.anonymous,
      "titles", req.body.title,
      "descriptions", req.body.description);
    let admin_code = uuid(), submission_code = uuid();
    dbHelper.savePoll(req.body.creator_name,
        req.body.creator_email,
        req.body.question,
        req.body.background_path,
        req.body.anonymous,
        admin_code,
        submission_code
      )
      .then((id) => {
        const choicesPair = zip(req.body.title, req.body.description);
        console.log(JSON.stringify(choicesPair));
        const rows = [];
        choicesPair.forEach(function (pair) {
          if (pair[0] != '') {
            rows.push({
              polls_id: Number(id),
              title: pair[0],
              description: pair[1]
            });
          }
        });
        dbHelper.saveChoices(rows)
          .then((result) => {
         email.send({
           to: req.body.creator_email,
           from: 'noreply@llop.com',
           subject: 'Poll Created',
           text: `
           Hi ${req.body.creator_name},

           Your poll has been created.

           Link for the results:

           ${env.DB_HOST + ':8080/administrative/' + admin_code}

           Link for voting:

           ${env.DB_HOST + ':8080/vote/' + submission_code}

           Kind regards,
           Llop dev team
           `
         }, function (err, json) {
           if (err) {
             return console.error(err);
           }
           console.log(json);
         });
        console.log("asdfwqerqkewjfksaldfasdf");
        res.json(submission_code);
      })
      .catch((err) => {
        console.log("POST /polls:", err);
        res.status(500).redirect('/error');
      });
    });
  });
    return router;

}
