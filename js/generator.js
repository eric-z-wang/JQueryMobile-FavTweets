

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

        markup = ["<li class='ui-btn ui-btn-hover-c' id=", id, ">"];
        markup.push("<p>");
        markup.push(text);
        markup.push("</p>");
        markup.push("<img src=");
        markup.push(pic);
        markup.push(">");
        markup.push("<h2>");
        markup.push(username);
        markup.push("</h2>");
        markup.push("</a></li>");
        list_root.append(markup.join(''));         
    });
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
    media_url = '';
    media_w = 0;
    media_h = 0;
    media_exists = 0;
    favourites_count=json['user']['favourites_count'];
    retweet_count=json['retweet_count'];
    text=json['text'];
    username=json['user']['name'];
    pic=json['user']['profile_image_url'];
    created_at=json['created_at'];
    screenname=json['user']['screen_name'];
    urls=json['entities']['urls'];
 
    //if (urls.length >0) {
    //    console.log("indicies here");
    //    console.log(urls);
    //    markeduptext = mark_up_text(text, urls);
   //}


    if (json['entities']['media']){
      media_exists = 1;
      media=json['entities']['media'];
      for (var i=0;i<media.length;i++){
        if (media[i]['type'] == "photo"){
          media_url = media[i]['media_url'];
          media_h = media[i]['sizes']['small']['h'];
          media_w = media[i]['sizes']['small']['w'];
          break;
        }
      }
    }
    markup = ["<div class='individual-tweet'>"];
    markup.push("<img src=");
    markup.push(pic);
    markup.push(">");
    markup.push("<h2>");
    markup.push("<a href=https://twitter.com/");
    markup.push(screenname);
    markup.push(">");
    markup.push(username);
    markup.push("</a></h2>");
    markup.push("<p>");
    markup.push(text);
    markup.push("</p>");
    if (media_exists){
        markup.push("<img src=");
        markup.push(media_url);
        markup.push(" width=");
        markup.push(media_w);
        markup.push(" height=");
        markup.push(media_h);
        markup.push(">");
    }
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
    
    return markup.join('');
}

function mark_up_text(text, urls) {
    var astart = '<a href=';
    var amiddle = '>';
    var aend = '</a>';
    var istart = 0;   
    urlsmarkup=[];     
    text_chunks = [];
    markeduptext=text;
    indices = [];
    text_chunks.push(text.slice(istart,iend));

    for (var i=0; i< urls.length; i++)
        {

            url=urls[i];
            console.log(url);
            var istart = url['indices'][0];
            var iend = url['indices'][1];
            var replace_str=text.substring(istart,iend);
            console.log(replace_str);
            markup=astart, url['url'], amiddle, 
                text.substring(istart, iend), aend;

            markeduptext.replace(replace_str, markup);
        }
    console.log(markeduptext);
    return markeduptext;
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
