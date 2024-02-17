import "http";

export http.createServer(function (req, res) {
  res.write("I'm alive");
  res.end();
}).listen(8080);
