$(document).ready(function(){

// database stand-in, delete later
  var question = {
    id: 123,
    content: 'Which fruit is the root of all evils and should be eliminated from the earth?'
  };
  var obj = {
    item1 : { id: 1,
              content : 'apple'
            },
    item2 : { id: 2,
              content: 'orange'
            },
    item3 : { id: 3,
              content: 'banana'
            },
    item4 : { id: 'new',
              content: 'melon'
            },
    item5 : { id: 'donald',
              content: 'pineapple'
            },
    item6 : { id: 'caitlin',
            content: 'blackberries'
            }
  };


// Dynamically generate list of options, store id of choices in custom attribute
  function makeList(obj){
    var $div = $('<div>');
    $div.append(question.content).attr('questionId', question.id);
    $('.question').append($div);
    for (var item in obj) {
      var $li = $('<li>');
      $li.append(obj[item].content).addClass('ui-state-default').attr('choiceId', obj[item].id);
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
    var choiceIdsRanked = [];
    for (var i = 0; i < $listElements.length; i ++) {
      choiceIdsRanked.push($listElements[i].attributes.choiceId.nodeValue);
    }
    console.log(choiceIdsRanked);
    $('.vote_container').slideUp('fast');
    $('.vote_feedback').slideDown('fast');
  })




});
