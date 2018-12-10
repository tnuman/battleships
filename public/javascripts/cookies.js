var main = function() {
    "use strict";
    checkVisits();
}
$(document).ready(main);

function getCookieValue() {
    var cookie = document.cookie;
    if (cookie === "") {
      return "";
    } else {
      // we only have 1 cookie, so split with '=' as seperator and return the value
      var splitcookie = cookie.split("=");
      return splitcookie[1];
    }
   
}

var checkVisits = function() {
    var visits = getCookieValue();
    if (visits === "") {
      document.cookie = "visits=0";
      $("#visits span").text("0");
    } else {
      visits = parseInt(visits) + 1;
      document.cookie = "visits=" + visits;
      $("#visits span").text(visits);
    }
}
