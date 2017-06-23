$(document).ready(function(){

  //testing: passing the uri from ejs is successful
  console.log(uri);

 $.ajax({
   method: 'GET',
   url: `/vote/api/${uri}`,
 }).done(function(questionObj){
   console.log(questionObj);
   console.log(questionObj[uri]);
   var $div = $('<div>');
   $div.append(questionObj[uri]);
   $('.question').append($div);
 });



// database stand-in, delete later

  var obj = {
    item1 : { id: 1,
              title : 'apple',
              description: 'RED BIG DESCRIPTION SO BIG VERY BIG AHHHHHHHHHHHHHHHHHHHHH'
            },
    item2 : { id: 2,
              title: 'orange',
              description:'BRIGHT'
            },
    item3 : { id: 3,
              title: 'banana',
              description: 'yellow'
            },
    item4 : { id: 'new',
              title: 'melon',
              description: 'green'
            },
    item5 : { id: 'donald',
              title: 'pineapple',
              description: 'oy'
            },
    item6 : { id: 'caitlin',
              title: 'blackberries',
              description: 'black'
            }
  };


// Dynamically generate list of options, store id of choices in custom attribute
  function makeList(obj){
    for (var item in obj) {
      var $li = $('<li>');
      $li.append(obj[item].title).addClass('ui-state-default').attr('title', obj[item].description).attr('choiceId', obj[item].id);
      $('.sortable').append($li);
    }
  };

  makeList(obj);

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
    var voterName = {name: 'Fluffers'}
    for (var i = 0; i < $listElements.length; i ++) {
      // choiceIdsRanked.push($listElements[i].attributes.choiceId.nodeValue);
      choiceIdsRanked[i + 1] = $listElements[i].attributes.choiceId.nodeValue;
    }
    console.log(choiceIdsRanked);
    $.ajax({
      method: 'POST',
      url: '/vote',
      data: choiceIdsRanked, voterName
    }).done(function(){
      $('.vote_container').slideUp('fast');
      $('.vote_feedback').slideDown('fast');
    });
  })


  $('.sortable').on('mouseover mouseout', '.ui-state-default', function(event){
    var x = event.clientX;
    var y = event.clientY;
    console.log(x,y);

    $('.ui-state-default[title]').tooltipster({
      theme : 'tooltipster-light',
      animation : 'fade'
    });
  });

});

