function QueryString(item) {
    var sValue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
    return sValue ? sValue[1] : sValue;
}