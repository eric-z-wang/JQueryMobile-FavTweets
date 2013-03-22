

/* This function gets called when the document is loaded up in the 
  browser. It will bind all necessary events to their handler functions.*/
 $(document).ready(function() {
   // Bind the comment form submit to its handler.
    $("#nextpage").click(function() {
        next_page();
    });
   //$("#loadfavesbutton").onClick(function(e) {

    $("#prevpage").click(function() {
        prev_page();
    });

   preload_faves();
   //     )});
    
 })
