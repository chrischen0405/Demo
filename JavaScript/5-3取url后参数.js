function QueryString (item) {
    const sValue = location.search.match(new RegExp('[\?\&]' + item + '=([^\&]*)(\&?)', 'i'))
    return sValue ? sValue[1] : sValue
}
