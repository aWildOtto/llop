"use strict";
const express = require('express');
const router  = express.Router();
var sendgrid = require('sendgrid');

module.exports = (dbHelper, ENV) => {


  router.get("/", (req, res) => {
    res.render("error");
  });

  router.get('/:id',(req,res)=>{
    dbHelper.checkSubCode(req.params.id).then((result) => {
      if(result.length === 0){
        res.render('error');
        return;
      }else{
        res.render('vote', {uri : req.params.id});
        return;
      }
    });
    
  });

  router.get('/api/:id', (req,res) =>{
    dbHelper.getPollAndChoicesBySubCode(req.params.id).then((results) => {
      console.log(results);
      res.json(results);
    })
    .catch((err) => {
      res.redirect('/error');
      console.log(err);
    });
  });

  router.post('/api/:id',(req,res)=>{
    var email = sendgrid(ENV.SENDGRID_API);
    // console.log(item,":", req.body[item]);
    console.log(req.body);
    const poll_id_prom = dbHelper.getPollIdBySubCode(req.params.id);
    const voter_create_prom = poll_id_prom.then((poll_id)=>{
      console.log("poll_id",poll_id[0].id);
      return dbHelper.saveVoter(poll_id[0].id, req.body['1']['name']);
      }
    );
    const allVoter_choices_prom = voter_create_prom.then((voter_id) => {
      console.log("voter_id",voter_id[0]);
      const voteInsertPromises = [];
      for(let rank in req.body){
        voteInsertPromises.push(dbHelper.saveVoterChoice(voter_id[0], Number(req.body[rank].choiceIds),Number(rank)));
      }
      return Promise.all(voteInsertPromises);
    });
    allVoter_choices_prom.then((results)=>{
      dbHelper.getPollBySubCode(req.params.id).then((result)=>{
        console.log(result);
        console.log(result[0].anonymous);
        let voterName = !result[0].anonymous? req.body['1']['name'] : "someone(anonymous)";
        console.log(voterName);
        email.send({
          to: result[0].creator_email,
          from: 'noreply@llop.com',
          subject: 'Your poll just got a new response!',
          text: `
          Hi ${result[0].creator_name},

          ${voterName} voted on your poll:
          ${result[0].question}
          Link for the results:
          ${'localhost:8080/administrative/'+result[0].admin_code}

          Kind regards,
          Llop dev team
          `
        }, function (err, json) {
          if (err) {
            return console.error(err);
          }
          console.log(json);
        });
      });
    
      res.status(201).send();
    })
    .catch((err)=>{
      res.redirect('/error');
      console.log(err);
    });
  });

  return router;
}
