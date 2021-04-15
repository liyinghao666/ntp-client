const api = "/api/*"
module.exports = function mock(app) {
  app.get(api, handleGet)
  app.post(api, handlePost)
}
function handleGet(req, res) {
  console.log("webpack dev server receive get")
  res.json({})
}
function handlePost(req, res) {
  console.log("webpack dev server receive post")
  res.json({})
}