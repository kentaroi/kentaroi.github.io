module.exports = {
  monthIndexToName: function(index) {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][index];
  },
  monthIndexToNumeric: function(index) {
    return (index + 1).toString().padStart(2, '0');
  },
  formatDate: function(date, longOrShort = 'long') {
    return date.toLocaleDateString('en-GB',
      {weekday: longOrShort, year: 'numeric', month: longOrShort, day: 'numeric'});
  },
  tagNameToUrl: function(name) {
    return encodeURI('/tags/' + name + '/');
  },
  except: function(list, ...exception) {
    return list.filter(e => !exception.includes(e));
  }
};
