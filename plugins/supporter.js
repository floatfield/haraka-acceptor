// supporter

// documentation via: haraka -c /home/bitterlife/rubbish_heap/rubbish/sandbox/testSupport -h plugins/supporter

// Put your plugin code here
// type: `haraka -h Plugins` for documentation on how to create a plugin

var Promise = require('bluebird'),
    request = require('request'),
    post = Promise.promisify(request.post);

exports.hook_data = function (next, connection, params) {
  connection.transaction.parse_body = true;
  next();
};

exports.hook_data_post = function(next, connection, params){
  var bodyText = connection.transaction.body.bodytext,
      sender = connection.transaction.mail_from.user + '@' + connection.transaction.mail_from.host;
  post({
    url: 'http://127.0.0.1/app_dev.php/mail_request',
    form: {
      email: sender,
      body: bodyText
    }
  })
  .bind(this)
  .catch(function (err) {
    this.logerror(err);
  });
  next();
};
