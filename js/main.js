

/* This function gets called when the document is loaded up in the 
  browser. It will bind all necessary events to their handler functions.*/
 $(document).ready(function() {
   // Bind the comment form submit to its handler.
    $("#nextpage").click(function() {
        next_page();
    });

    $("#prevpage").click(function() {
        prev_page();
    });

    /* This stuff didn't work well.
    $("#sortcontrols").click(function() {
        console.log($(this));
        // console.log($(value).attr('sortby'));                    
        // sort_faves($(value).attr('sortby'));
    });*/

    $("#hashsort").click(function() {
        sort_faves($(this).attr('sortby'));
    });

    $("#usersort").click(function() {
        sort_faves($(this).attr('sortby'));
    });

    $("#locationsort").click(function() {
        sort_faves($(this).attr('sortby'));
    });

    $("#datesort").click(function() {
        sort_faves($(this).attr('sortby'));
    });
	
	$("#hashfilter").click(function() {
	  load_hashes();
	});
	
	$("#atfilter").click(function() {
	  load_ats();
	});
	
	$("#locfilter").click(function() {
	  load_locations();
	});
	
   preload_faves();
 });


