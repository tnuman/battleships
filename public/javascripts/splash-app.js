var main = function() {
    "use strict";
    checkVisits();
}
$(document).ready(main);

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

var checkVisits = function() {
    var visits = getCookie("visits");
    console.log(visits);
    if (visits != "") {
        visits = parseInt(visits) + 1;
        $("#displayVisits").text(visits);
        document.cookie = "visits=" + visits;
    } else {
      document.cookie = "visits=0";
      $("#displayVisits").text("0");
    }
}
