$(document).ready(function(){

  //testing: passing the uri from ejs is successful
  console.log(uri);
  var name_input;
  $.ajax({
    method: 'GET',
    url: `/vote/api/${uri}`,
  }).done(function(results){
    makeList(results);
    makeQuestion(results);
    if(name_input){
      console.log(results,"asdasd");  
      $(".name_container").hide();
      $('.vote_container').slideDown('fast');
    }
  }).catch(function(err){
    console.log(err);
  });


// Dynamically generate list of options, store id of choices in custom attribute
  function makeList(obj){
    for (var item in obj) {
      var creator_name = obj[item].creator_name;
      var title = obj[item].title;
      var description = obj[item].description;
      var choiceId = obj[item].id;
      name_input = obj[item].anonymous;
      console.log("nume_input ",name_input);
      var $li = $('<li>');
      $li.append(title).addClass('ui-state-default').attr('title', description).attr('choiceId', choiceId);
      $('.sortable').append($li);
    }
  };
//Dynamically generate question and return
  function makeQuestion(obj) {
    var question = obj[0].question;
    var creator = obj[0].creator_name;
    var $div = $('<div>');
    $div.append(`${creator}\'s question: <br>`);
    $div.append(question);
    $div.append(`<br><div class="instructions">Drag and drop to rank these choices</div>`);
    $('.question').append($div);

  }

//error handling for empty name + show poll div once name submitted
  $('.submit_name').on('click', function(event) {
    event.preventDefault();
    var $nameLength = $('#vote_form input').val().length;
    if($nameLength === 0) {
      alert('Hey bud, your name can\'t be empty  (Ծ‸ Ծ)');
    } else {
      $('.name_container').slideUp('fast');
      $('.vote_container').slideDown('fast');
    }
  })

//retrieve choiceId stored in custom attribute, create array
// with index of the item being the voted rank
  $('#vote_form').on('submit', function(event) {
    event.preventDefault();
    var $sortableList = $('.sortable');
    var $listElements = $sortableList.children();
    console.log($listElements);
    var choiceIdsRanked = {};
    var voterName = $('#vote_form input').val()
    for (var i = 0; i < $listElements.length; i ++) {
      choiceIdsRanked[i + 1] = { choiceIds : $listElements[i].attributes.choiceId.nodeValue,
                                 name : voterName
                               }
    }
    console.log(choiceIdsRanked);
    $.ajax({
      method: 'POST',
      url: `/vote/api/${uri}`,
      data: choiceIdsRanked
    }).done(function(){
      $('.vote_container').slideUp('fast');
      $('#myModal2').modal("show");
    }).catch(function(err){
    console.log(err);
    });
  })


  $('.sortable').on('mouseover mouseout', '.ui-state-default', function(event){
    $('.ui-state-default[title]').tooltipster({
      theme : 'tooltipster-light',
      animation : 'fade'
    });
  });

});

