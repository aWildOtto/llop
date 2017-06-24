"use strict";

const express = require('express');
const router  = express.Router();

//-----------------utilities-----------------------
function zip(a,b){
  return a.map(function (e, i) {
      return [e, b[i]];
  });
}

module.exports = (dbHelper) => {

  router.get("/", (req, res) => {
    res.render('index');
  });

  router.post('/', (req,res)=>{

    console.log("question:",req.body.question, 
                "creator_name:",req.body.creator_name,
                "email:",req.body.creator_email,
                "background_path", req.body.background_path,
                "anonymous:", req.body.anonymous,
                "titles", req.body.title,
                "descriptions", req.body.description);
    
    dbHelper.savePoll(req.body.creator_name,
                      req.body.creator_email, 
                      req.body.question,
                      req.body.background_path,
                      req.body.anonymous
                      )
      .then((id) => 
      {
        const choicesPair = zip(req.body.title, req.body.description);
        console.log(JSON.stringify(choicesPair));
        const rows = [];
        choicesPair.forEach(function(pair) {
          if(pair[0]!=''){
            rows.push({
              polls_id: Number(id), 
              title: pair[0],
              description: pair[1] 
            });
          }
        });

        dbHelper.saveChoices(rows)
        .then((result) => {
          res.redirect('/');
        })
        .catch((err) => {
          console.log("POST /polls:", err);
          res.status(500).end("database error");
        });

      })
      
  });
  return router;
}
