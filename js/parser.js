/** 
* Globals
**/
var JSON_PATH='jsons/favs.json';
var favourites_json; // Full favourites list. DO NOT MODIFY.
var cur_json; // Filtered, ordered list. Modify as much as you want.
var json_page_limit = 3;
var current_page=1;
var current_order='default'; 
/*
    We can order by 'hashtag', 'user', 'date', 'location'. In 'ascending' and 'descending' order.
*/

/*
Get the local json file to store into cached mem.
*/
function preload_faves() {
    console.log('Loading Faves Json');
    $.getJSON(JSON_PATH, function(data) {
        favourites_json=data; // Cached in memory for better performance.
        cur_json = favourites_json; // Need this later once we have sorting/filtering
        refresh_list();
    });
}

/*
Slices the correct json elements from a json object given
a page number.
*/
function return_json_page(faves_json, pagenum) {
    start = (pagenum - 1)* json_page_limit;
    end = pagenum * (json_page_limit);
    
    return faves_json.slice(start,end);    
}

function next_page() {
    current_page = Math.min(Math.floor(cur_json.length/json_page_limit)+1,current_page += 1);
    refresh_list();
}

function prev_page() {
    current_page = Math.max(1,current_page-1);
    refresh_list();
}

function refresh_list() {
    tweet_summary_markup(return_json_page(cur_json,current_page));
}


/*
This guy is the guy that sorts the fave tweets json
according to the specified sorters.

Input: 
faves is a json containing all of the user's
current tweets (after filters). 
sortby is an *ordered* list of at least one parameter type
to sort the tweets by.

Output: a properly sorted json containing the faves.
*/
function sort_faves(sort_by) {
    var sortdict={ 
    'user':function(a,b){return a['user']['screen_name']>b['user']['screen_name']},
    'location':function(a,b){return a['geo']>b['geo']},
    'date': function(a,b){return a['created_at']>b['created_at']}
                 }

    if (sort_by==current_order) {
        cur_json.reverse(sortdict[sort_by]);        
    } else {
        cur_json.sort(sortdict[sort_by]);
    }
    current_order=sort_by;
    current_page=1;
    refresh_list();
}


/*
Takes the user's fave tweets json and finds all tweets which
meet the filter parameters, then returns the filtered json
for those faves.
Input: a list of parameters to filter by, 1 json for faves.
Output: Filtered faves json.
*/
function filter_faves(tags, faves) {
    filtered_faves = [];
    $.each(faves, function(fav_key,fav_val) {
        tag_exists = 1;
        $.each(tags, function(tag_key, tag_val){
            if (fav_val['text'].indexOf(tag_val) == -1){
                tag_exists = 0;
                return false;
            }
        });
        if (tag_exists){    
            filtered_faves.push(fav_val);
        }
    });
    return filtered_faves;
    refresh_list();
}
