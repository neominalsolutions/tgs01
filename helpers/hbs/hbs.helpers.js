const hbs = require('express-hbs');
const moment = require('moment');

  hbs.registerHelper('upperCase', function (value) {
    return value.toUpperCase()
  })
  
  hbs.registerHelper('capitialize', (value) => {
    if(typeof(value) === "string") {
      return `${value[0].toUpperCase()}${value.substring(1,value.length)}`
    } else {
      return value;
    }
  
  });

  hbs.registerHelper('formatDate', (value, dateFormat) => {
    debugger;

    // tarih formatımı
    if(moment.isDate(value)) {

      return moment(value).format(dateFormat);
    }
    return value;
  });

  hbs.registerHelper("list", function(items, options) {
    // options.fn(item) doğru formatta item nesnesni render edip ekrana yansıtmak için kullanılan hbs engine method.
    const itemsAsHtml = items.map(item => "<li>" + options.fn(item) + "</li>");
    return "<ul>\n" + itemsAsHtml.join("\n") + "\n</ul>";
  });



// module olarak dışarı çıkardık
module.exports = hbs;



// hbs.js dosyasını app.js den çağırmak için kullandık.
// module.exports = myHbs;