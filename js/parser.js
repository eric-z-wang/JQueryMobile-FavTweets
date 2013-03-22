

/** 
Globals
**/
var JSON_PATH='jsons/favs.json';
var favourites_json;

/*
Get the local json file to store into cached mem.
*/
function preload_faves() {
    console.log('Loading Faves Json');
    $.getJSON(JSON_PATH, function(data) {
        favourites_json=data;
        tweet_summary_markup(favourites_json);
    });
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
