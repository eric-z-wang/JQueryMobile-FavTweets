

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
        markup.push("</a></li>");
        list_root.append(markup.join(''));         
    });

    // Attach handler to his here bitch
    list_root.children().click(function() {
        viewer=$("#tweetviewcontent");
        viewer.empty();
        tweet=tweet_mark_up(cur_json[parseInt($(this).attr("id"))+current_page]);
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
    markup = ""; 
    // Code goes here
    return "<div>"+json+"</div>";
}


