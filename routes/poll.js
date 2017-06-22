"use strict";

const express = require('express');
const router  = express.Router();

function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.render('index');
  });

  router.post('/', (req,res)=>{
    // let randAdminCode = randomString(10);
    // knex.select().from("polls").where({admin_code: randAdminCode}).then((row)=>{
    //   if(row.length === 0){        
    //     // knex('polls').insert({question: req.body.question, 
    //     //                       creator_name: req.body.creator_name,
    //     //                       creator_email: req.body.creator_email,
    //     //                       background_path: req.body.background_path,
    //     //                       anonymous: req.body.anonymous
    //     //   });
    //   }
    // });

    console.log("question:",req.body.question, 
                "creator_name:",req.body.creator_name,
                "email:",req.body.creator_email,
                "background_path", req.body.background_path,
                "anonymous:", req.body.anonymous,
                "titles", req.body.title,
                "descriptions", req.body.description);
    res.redirect('/');
  });
  return router;
}
