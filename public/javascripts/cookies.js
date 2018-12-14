var main = function() {
    "use strict";
    checkVisits();
};
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

// set expires to far in the future, so the cookie will be persistent
var expireDate = "expires=Wo, 01-Jan-2070 12:00:00 GMT";

var checkVisits = function() {
    var visits = getCookieValue();
    if (visits === "") {
      document.cookie = "visits=0;" + expireDate;
      $("#visits span").text("0");
    } else {
      visits = parseInt(visits) + 1;
      document.cookie = "visits=" + visits + "; " + expireDate;
      $("#visits span").text(visits);
    }
};