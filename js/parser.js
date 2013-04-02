/** 
* Globals
**/
var JSON_PATH='jsons/favs.json';
var favourites_json; // Full favourites list. DO NOT MODIFY.
var cur_json; // Filtered, ordered list. Modify as much as you want.
var json_page_limit = 10;
var current_page=1;
var current_order='default'; 
var hashtags;
var hashtags_set = 0;
var ats_set = 0;
var locations_set = 0;

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
 * Load the hashtags into the hashtag list if they have not been loaded yet.
 */
function load_hashes() {
  if (hashtags_set) {
	cur_json = favourites_json;
	return;
  }
  var hashtags = new Array();
  console.log('Loading hashtags into list.');
  
  var hashlist = new Array();
  
  for (var i=0; i<cur_json.length; i++) {
	hashlist = cur_json[i]["entities"]["hashtags"];
	
	for (var j=0; j<hashlist.length; j++) {
	  hashtags.push(hashlist[j]["text"]);
	}
  }
  console.log(hashtags);
  generate_hashes(hashtags);
  hashtags_set = 1;
}

/*
* Load the ats into the hashtag list if they have not been loaded yet.
*/
function load_ats() {
  if (ats_set) {
	return;
  }
  var ats = new Array();
  console.log('Loading ats into list.');
  
  for (var i=0; i<cur_json.length; i++) {
	ats.push(cur_json[i]["user"]["name"]);
  }
  
  console.log(ats);
  generate_ats(ats);
  ats_set = 1;
}

/*
 * Load the locations into the location list if they have not been loaded yet.
 */
function load_locations() {
  if (locations_set) {
	return;
  }
  var locations = new Array();
  console.log('Loading locations into list.');
  
  for (var i=0; i<cur_json.length; i++) {
	if (cur_json[i]["place"]) {
	  locations.push(cur_json[i]["place"]["name"]);
	}
  }
  
  console.log(locations);
  generate_locations(locations);
  locations_set = 1;
}

/*
Slices the correct json elements from a json object given
a page number.
*/
function return_json_page(faves_json, pagenum) {
    start = (pagenum - 1) * json_page_limit;
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
function filter_hashes(hash) {
	console.log("Filtering hashes.");
	
	console.log(hash);
	
	var hashlist;
    var filter_list = new Array();
    
	for (var i=0; i<cur_json.length; i++) {
	  
	  // Hashtag value is a list, so, go through the list.
	  hashlist = cur_json[i]["entities"]["hashtags"];
	  
	  for (var j=0; j<hashlist.length; j++) {
		
			if (hashlist[j]["text"] == hash) {
				filter_list.push(cur_json[i]);
			}
		}
	}
	cur_json = filter_list;
	// Remove duplicates.
    refresh_list();
}

