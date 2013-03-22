

/*
Returns markup required to render a single 
tweet summary as displayed in the faves list layout.
Input: A json containing the tweet summary details.
Output: HTML markup, dummy!
*/
function tweet_summary_markup(json) {
    list_root=$('#listfaves');
    
    // Make markup for each json in the thinga:    
    $.each(json, function(key,val) {
        // Get the relevant stuffs from the json:
        text=val['text'];
        pic=val['user']['profile_image_url'];
        username=val['user']['name'];

        // Build up the html markup:
        markup = ["<li><a>"];
        markup.push("<p>");
        markup.push(text);
        markup.push("</p>");
        markup.push("<img src=");
        markup.push(pic);
        markup.push("><h2>");
        markup.push(username);
        markup.push("</h2>");
        markup.push("</a></li>");
        list_root.append(markup.join('')); 
        console.log(markup);
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
    return markup;
}


