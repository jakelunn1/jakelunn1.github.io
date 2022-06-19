var $ = function(id) {
  return document.getElementById(id);
};


var search = [ // Search engines
  ["", "https://www.google.com/#q="], // Google (Default)
  ["!g", "https://www.google.com/#q="], // Google
  ["!i", "https://www.google.com/search?tbm=isch&q="], // Google Images
  ["!y", "https://www.youtube.com/results?search_query="], // YouTube
  ["!r", "https://www.reddit.com/search?q="], // Reddit
  ["!h", "https://github.com/search?q="], // GitHub
  ["!d", "https://duckduckgo.com/?q="], // DuckDuckGo
  ["!w", "http://en.wikipedia.org/w/index.php?search="], // Wikipedia
];

var menus = [ // Menu Titles ["Title", width(px)],                                                   /* menu width */
  ["Reddit", 200], // menu-1
  ["Quicklinks", 200], // menu-2
  ["Entertainment", 200], // menu-3
  ["Other", 200], // menu-4
];

var showFavicon = true; // Enable/Disable Favicons

// Link setup (separate with ["", "", ""],)
// Format: ["Name", "URL", "Custom Favicon"],
var links = [
  // Reddit -          menu-1
  ["/r/unixart", "http://www.reddit.com/r/unixart", ""],
  ["/r/unixporn", "http://www.reddit.com/r/unixporn", ""],

  ["", "", ""],

  // Quicklinks -     menu-2
  ["Reddit", "http://www.reddit.com", ""],
  ["Google", "https://www.google.com", ""],
  ["Gmail", "https://mail.google.com", ""],
  ["GitHub", "https://github.com", ""],
  ["Forecast.io", "https://forecast.io/", ""],
  ["Slashdot", "http://slashdot.org", ""],

  ["", "", ""],

  // Entertainment -  menu-3
  ["HypeM", "http://hypem.com", ""],
  ["Feedly", "https://feedly.com/", ""],
  ["Netflix", "https://netflix.com", ""],
  ["Pocket", "https://getpocket.com/a/queue/", ""],
  ["Spotify", "https://play.spotify.com", ""],
  ["YouTube", "https://youtube.com", ""],

  ["", "", ""],

  // Other -          menu""-4
  ["Imgur", "https://imgur.com/", ""],
  ["CodePen", "https://codepen.io", ""],
];


var ss = "";

function init() {
  for (var i = 0; i < search.length; i++)
    if (search[i][0] == "") ss = search[i][1];
  if (ss == "") {
    alert("Error: Missing default search engine!");
  }

  build();

  $('q').value = "";
  $('q').focus();   //autofocus the searchbar
}

function build() { // Build menus
  $('mnu').innerHTML = "";

  for (var i = 0; i < menus.length; i++) { // Menu titles
    $('mnu').innerHTML += "<li><label>" + menus[i][0] + "</label>\n<ul id=\"mnu_" + (i + 1) + "\"></ul></li>";
    $('mnu_' + (i + 1)).style.width = menus[i][1] + "px";
  }

  var m = 1,
    skip = false;
  for (var i = 0; i < links.length; i++) { // Menu links
    if (links[i][0] == "" && links[i][1] == "") {
      skip = true;
    }

    if (!skip) {
      var printimg = "";

      if (showFavicon) {
        var favicon;
        if (links[i][2] != "") favicon = links[i][2];
        else favicon = getFavicon(links[i][1]);

        printimg = "<img id=\"img_" + i + "\" src=\"" + favicon + "\"" + " onload=\"javascript:this.style.visibility='inherit';\" /> ";
      }

      $('mnu_' + m).innerHTML += "<li><a href=\"" + links[i][1] + "\" target=\"_self\">" + printimg + links[i][0] + "</a></li>";
    } else {
      skip = false;
      m++;
    }
  }
}

function handleQuery(e, q) { // Handle search query
  var key = e.keyCode || e.which; // get keypress

  if (key == 13) { // on "Enter"
    if (q.lastIndexOf("!") != -1) { // if "!" is found
      var x = q.lastIndexOf("!"),
        found = false;

      for (var i = 0; i < search.length; i++) {
        if (search[i][0] == q.substr(x)) { // Find "!?"
          found = true;
          window.location = search[i][1] + q.substr(0, x).replace(/&/g, "%26");
        }
      }
      if (!found) { // Invalid "!?", use default
        window.location = ss + q.substr(0, x).replace(/&/g, "%26");
      }
    } else { // "!?" where not specified, use default
      window.location = ss + q.replace(/&/g, "%26");
    }
  }
}

/* Help menu */
var m = false;

function toggle() { // Toggle help
  m = !m;

  if (m) {
    $('help').style.opacity = 1;
    $('more').innerHTML = "-";
  } else {
    $('help').style.opacity = 0;
    $('more').innerHTML = "+";
  }

  $('q').focus();
}

function fade(x) {
  if (x == 1) {
    $('form').style.top = "-100px";
    $('form').style.opacity = 0;
    if (m) toggle();
  } else {
    $('form').style.top = "0px";
    $('form').style.opacity = 1;
    $('q').focus();
  }
}

function getFavicon(url) {
  var l = document.createElement("a");
  l.href = url;

  return l.protocol + "//" + l.hostname + "/favicon.ico";
}