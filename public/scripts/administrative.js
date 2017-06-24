$(document).ready(function(){
  console.log(uri);

  $.ajax({
    method: 'GET',
    url: `/administrative/api/${uri}`,
  }).done(function(results){
    makeList(results);
    makeQuestion(results);
  });

  function makeList(arr){
    arr.forEach(function(item){
      var creator_name = item.creator_name;
      var title = item.title;
      var description = item.description;
      var choiceId = item.id;
      var $li = $('<li>');
      $li.append(title).attr('title', description).addClass('options');
      $('.results').append($li);
    });
  };

 function makeQuestion(arr) {
   var question = arr[0].question;
   var creator = arr[0].creator_name;
   var $div = $('<div>');
   $div.append(`Here are the results for <em>${creator}</em>'s poll:`);
   $div.append(question).addClass('question_wrapper');
   $('.question').append($div);
 }

});
