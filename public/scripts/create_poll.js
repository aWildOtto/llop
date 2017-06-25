$(document).ready(function () {

  var max_fields = 20; //maximum input boxes allowed
  var wrapper = $(".input_fields_wrap"); //Fields wrapper
  var add_button = $(".add_field_button"); //Add button ID
  var x = 0; //initlal text box count

  function checkIfEmailInString(text) {
    var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(text);
  } //function using reg expression to error check for valid email

  $(add_button).click(function (e) { //on add input button click
    e.preventDefault();
    if (x < max_fields) { //max input box allowed
      x++; //text box increment
      $(wrapper).append(
        `<div class="container">
          <div class="row">
            <div id="text_field" class="col-sm-6">
              <input class="option" type="text" placeholder="option" name="title[]">
            </div>
            <div id="description_field" class="col-sm-6">
              <input class="description" rows="3" name="description[]" placeholder = "description">
              <button class="remove_field btn-remove btn-circle btn-lg"><i class="glyphicon glyphicon-remove"></i></button>
            </div>
          </div>
        </div>`) //add input box
    }
  });

  $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
    e.preventDefault();
    console.log($(this).parentsUntil('.row'));
    $(this).parentsUntil('.row').parent().remove();
    x--;
  });

  $(".poll_form").on("submit", function (e) {
    e.preventDefault();
    if ($(".question_field").val().length === 0) {
      alert('Question field cannot be empty, please enter a question');
      return;
    }

    var countOptions = 0;
    $(".option").each(function (index, element) {
      if ($(this).val().length != 0) {
        countOptions += 1;
      }
    });

    if(countOptions >= 2){
      $.ajax({
        method: "POST",
        url: "/create",
        data: $(this).serialize()
      }).done(function (result) {
        console.log(result);
        $('.modal-footer').append("<a href='/vote/"+result+"'>Go to vote page</a>");
        $(".second_page").css("display", "none");
        $('#myModal').modal("show");
      });
    } else {
      alert("Not enough options to start a poll!");
    }
  });

  $("#firstpage_submit").on("click", function (e) {
    e.preventDefault();
    if ($(".email_field").val().length === 0 || checkIfEmailInString($(".email_field").val()) === false) {
      alert('Please enter a valid email address');
      return;
    } 
    if ($(".name_field").val().length === 0) {
      alert('Please enter a name');
      return;
    }
    $(".second_page").slideDown("fast");
    $(".first_page").slideUp("fast");
  });

  $("#home_button").on("click", function (e) {
    e.preventDefault();
    $(".second_page").slideUp("fast");
    $(".first_page").slideDown("fast");
  })

});
