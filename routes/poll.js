"use strict";

const express = require('express');
const router  = express.Router();

function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.render('ejs');
  });

  router.post('/', (req,res)=>{
    knex('polls').insert({question: req.body.question, 
                          creator_name: req.body.creator_name,
                          creator_email: req.body.creator_email,
                          background_path: req.body.background_path,
                          anonymous: req.body.anonymous
      }).asCallback((err, result)=>{
        if(err){
          console.log(err);
        }
        let i = 0;
        let desc;
        req.body.title.forEach(function(element) {
          desc = req.body.description[i];
          knex('choice').insert({title: element, description: desc}).asCallback((err,result)=>{
            if(err){
              console.log(err);
            }
          })
          i++;
        });
      });
  });
  return router;
}
