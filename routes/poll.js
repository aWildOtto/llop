"use strict";
const express = require('express');
const router  = express.Router();
const uuid = require('uuid/v4');
var sendgrid = require('sendgrid')('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');

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

    console.log("question:", req.body.question,
      "creator_name:", req.body.creator_name,
      "email:", req.body.creator_email,
      "background_path", req.body.background_path,
      "anonymous:", req.body.anonymous,
      "titles", req.body.title,
      "descriptions", req.body.description);

<<<<<<< HEAD
    console.log("question:",req.body.question, 
                "creator_name:",req.body.creator_name,
                "email:",req.body.creator_email,
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
      .then((id, sub_code, ) => 
      {
=======
    dbHelper.savePoll(req.body.creator_name,
        req.body.creator_email,
        req.body.question,
        req.body.background_path,
        req.body.anonymous
      )
      .then((id) => {
>>>>>>> e7d55defd6a9bbfa007006f0463a07bf37afc0d2
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
         sendgrid.send({
           to: 'ottohu101@gmail.com',
           from: 'other@example.com',
           subject: 'Hello World',
           text: 'My first email through SendGrid.'
         }, function (err, json) {
           if (err) {
             return console.error(err);
           }
           console.log(json);
         });

        res.redirect('/');
      })
      .catch((err) => {
        console.log("POST /polls:", err);
        res.status(500).redirect('/error');
      });
    });
  });
    return router;
  
}
