$(document).ready(function() {

  var categories = {
    produce: 0,
    beverages: 0,
    dairy: 0,
    meat: 0,
    canned: 0,
    paper: 0,
    personal: 0,
    misc: 0
  }



  $(".add-text-btn").on("click", function(){

    // using jquery selector to read input values
    let inputKey = $(".user-input-title").val();
    let inputValue = $(".user-input-body").val();
    //makes the id not have whitespace at all so can be deleted later
    let inputId = inputKey.replace(/\s/g,"");
    let category = $("input[name=category]:checked").val();
    console.log(category, 'this is category selected');
    categories[category] += 1;
    console.log(categories, 'this is categories after adding an item')
    // clear values on the display
    $(".user-input-title").val("");
    $(".user-input-body").val("");

    // console log the input values {key:value}
    console.log(inputKey, inputValue, 'this is inputKey and inputValue');


    //https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    localStorage.setItem(inputKey, inputValue);

    //update chart with each submission
    //updateChart();

    // data-uniqID
    let itemHtml = '<div class="display-item '+category+'" id="'+inputId+'" data-storage-key="'+inputKey+'"> ' + inputKey + ' <span class="tooltiptext">' + localStorage.getItem(inputKey) + ' </span></div>';
    $(".display").append(itemHtml);
    //console.log(localStorage);
    // how can we delegate this event to the outer html node?
    // https://learn.jquery.com/events/event-delegation/

    $(".display-item").on("click", function(e){
      // plop the key:value back into the input boxes
      $(this).toggleClass("clicked");
      // get the values from the the data dash properties
      console.log("key=> ", e.target.dataset.storageKey); // user-input-title
      localStorage.getItem(e.target.dataset.storageKey); // user-input-body

      // set those values in the form fields
      $(".user-input-title").val(e.target.dataset.storageKey);
      $(".user-input-body").val(localStorage.getItem(e.target.dataset.storageKey));
    });

  });

  $(".item-list").on('click', function(){
    console.log(this, 'this is item-list')
    var selClass = this.classList[1];
    console.log(typeof selClass,'this should be category')
    $('.display-item').each(function(index, el){
      console.log(el, 'this is el in forEach loop');
      if(!$(el).hasClass(selClass)){
        $(el).hide();
      }
    })
  });

  $("#restore").on("click", function(){
    $('.display-item').each(function(i, el){
      $(el).show();
    })
  })

   // TODO add back in later
  // example of how to do a filter based on a keyup event
//    $(".user-input").on("keyup", function(){
//      let inputValue = $(".user-input").val();
//      localStorage.setItem("testStorage", inputValue);
//      $(".display").text(localStorage.getItem("testStorage"));
//    });

   $(".del-text-btn").on("click", function(e) {
     alert('Item has been deleted.'); // maybe change to a window.confirm
     let inputKey = $(".user-input-title").val();
     // let inputValue = $(".user-input-body").val();
     let inputId = inputKey.replace(/\s/g,"");
     //let itemHtml = '<div class="display-item" id="'+inputId+'" data-storage-key="'+inputKey+'"> ' + inputKey + ' ' +  localStorage.getItem(inputKey) + '</div>';

     $('#'+inputId).remove();
     localStorage.removeItem( $('.user-input-title').val() ); // grab the title and plop here
     $(".user-input-title").val("");
     $(".user-input-body").val("");
   });

   $(".reset-text-btn").on("click", function(){
    alert('Your list is now clear.');
    localStorage.clear();
    $(".display").empty();
   })

  function displayAll(){
    var values = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;
    console.log(keys);
    while(i--){
      values.push([keys[i],localStorage.getItem(keys[i])]);
      console.log(values, 'this is values array. Should be objects');
    }
    values.forEach(function(food){
      let inputId = food[0].replace(/\s/g,"");
      $('.display').prepend('<div class="display-item" id="'+inputId+'" data-storage-key="'+food[0]+'"> ' + food[0] + ' <span class="tooltiptext">' + food[1] + ' </span></div>')
    })
    $(".display-item").on("click", function(e){
      // plop the key:value back into the input boxes
      $(this).toggleClass("clicked");
      // get the values from the the data dash properties
      console.log("key=> ", e.target.dataset.storageKey); // user-input-title
      localStorage.getItem(e.target.dataset.storageKey); // user-input-body

      // set those values in the form fields
      $(".user-input-title").val(e.target.dataset.storageKey);
      $(".user-input-body").val(localStorage.getItem(e.target.dataset.storageKey));
    });
   };
  displayAll();
});
