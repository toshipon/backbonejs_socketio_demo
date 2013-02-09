
#
# GET home page.
#

exports.index = (req, res)->
  res.render('index', { title: 'Backbone.js socket.io demo' })
