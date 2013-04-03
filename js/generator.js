

/*
Returns markup required to render a single 
tweet summary as displayed in the faves list layout.
Input: A json containing the tweet summary details.
Output: HTML markup, dummy!
*/
function tweet_summary_markup(json) {
    list_root=$('#listfaves');
    list_root.empty();
    
    // Make markup for each json in the thinga:    
    $.each(json, function(key,val) {
        // Get the relevant stuffs from the json:
        id=key;
        text=val['text'];
        pic=val['user']['profile_image_url'];
        username=val['user']['name'];

        // Build up the html markup:
        markup = ["<li class=tweet id=", id, "><a>"];
        markup.push("<p>");
        markup.push(text);
        markup.push("</p>");
        markup.push("<img src=");
        markup.push(pic);
        markup.push(">");
        markup.push("<h2>");
        markup.push(username);
        markup.push("</h2>");
        markup.push("<li class=tweettext>");
        markup.push(text);
        markup.push("</li>");
        markup.push("</div>");
        markup.push("</div>");
        markup.push("</li>");
        list_root.append(markup.join(''));         
    });

    // Attach handler to his here bitch
    list_root.children().click(function() {
        viewer=$("#tweetviewcontent");
        viewer.empty();
        tweet=tweet_mark_up(cur_json[parseInt($(this).attr("id"))+(current_page-1)*json_page_limit]);
        viewer.append(tweet);
        $.mobile.changePage('#tweetview', {
                allowSamePageTransition:true,
                transition:'pop'});
        // Pop that bitch open now
    });

    // Code goes here
    return markup;
}

/*  
This funky func will return the html markup
required to render all the details for a tweet.
Input: a json object holding the tweet.
Output: HTML markup, dummy!
*/
function tweet_mark_up(json) {
    favourites_count=json['user']['favourites_count'];
    retweet_count=json['retweet_count'];
    text=json['text'];
    username=json['user']['name'];
    pic=json['user']['profile_image_url']
    created_at=json['created_at'];

    markup = ["<div class='individual-tweet'>"];
    markup.push("<img src=");
    markup.push(pic);
    markup.push(">");
    markup.push("<h2>");
    markup.push(username);
    markup.push("</h2>");
    markup.push("<p>");
    markup.push(text);
    markup.push("</p>");
    markup.push("<div class='retweet'>");
    markup.push("<strong>");
    markup.push(retweet_count);
    markup.push(" </strong>RETWEETS");
    markup.push("</div>");
    markup.push("<div class='favourites'>");
    markup.push("<strong>");
    markup.push(favourites_count);
    markup.push(" </strong>FAVOURITES");
    markup.push("</div>");
    markup.push("<div class='create_time'>");
    markup.push(created_at);
    markup.push("</div></div>");
    
    // Code goes here
    return markup.join('');
}

function generate_hashes(hashtags) {
  console.log("Generating hashes.");
  list_root=$('#hashList');
  list_root.empty();
  
  var current;
  var hash;
  
  for (var i=0; i<hashtags.length; i++) {
	markup = [];
	hash = hashtags[i];
	
	markup.push("<li hashID=", hash, "><a href='index.html'>");
	markup.push(hash);
	markup.push("</a></li>");
	
	current = $(markup.join(''));
	current.appendTo(list_root);
	
	current.click(function() {
		filter_hashes([$(this).attr("hashID")]);
	});
  }
}

function generate_locations(locations) {
  console.log("Generating locations.");
  list_root=$('#locList');
  list_root.empty();
  
  var current;
  var location;
  
  for (var i=0; i<locations.length; i++) {
	markup = [];
	location = locations[i];
	
	markup.push("<li locationID=", location, "><a href='index.html'>");
	markup.push(location);
	markup.push("</a></li>");
	
	current = $(markup.join(''));
	current.appendTo(list_root); 
	
	current.click(function() {
	  filter_locations([$(this).attr("locationID")]);
	});
  }
}

function generate_ats(users) {
  console.log("Generating ats.");
  list_root=$('#atList');
  list_root.empty();
  
  var current;
  var user;
  var id;
  
  for (var i=0; i<users.length-1; i++) {
	markup = [];
	
	id = users[i][0]
	name = users[i][1]
	
	markup.push("<li atID=", id, "><a href='index.html'>");
	markup.push(name);
	markup.push("</a></li>");
	
	current = $(markup.join(''));
	current.appendTo(list_root); 
	
	current.click(function() {
	  filter_ats([$(this).attr("atID")]);
	});
  }
}
