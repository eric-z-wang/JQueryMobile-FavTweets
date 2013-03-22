/** 
Globals
**/
var JSON_PATH='jsons/favs.json';
var favourites_json; // Full on favourites list
var cur_json; // Filtered, ordered list.
var json_page_limit = 2;
var current_page=1;

/*
Get the local json file to store into cached mem.
*/
function preload_faves() {
    console.log('Loading Faves Json');
    $.getJSON(JSON_PATH, function(data) {
        favourites_json=data; // Cached in memory for better performance.
        cur_json = favourites_json; // Need this later once we have sorting/filtering
        tweet_summary_markup(return_json_page(favourites_json,current_page));
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
    tweet_summary_markup(return_json_page(favourites_json,current_page));
}

function prev_page() {
    current_page = Math.max(1,current_page-1);
    tweet_summary_markup(return_json_page(favourites_json,current_page));
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
function sort_faves(sort_by, faves) {
    //sorted_faves = faves;
    //return sorted_faves;
}


/*
Takes the user's fave tweets json and finds all tweets which
meet the filter parameters, then returns the filtered json
for those faves.
Input: 4 lists of parameters to filter by, 1 json for faves.
Output: Filtered faves json.
*/
function filter_faves(hashes, ats, locs, dates, faves) {
    //filtered_faves = faves;
    //return filtered_faves;
}
