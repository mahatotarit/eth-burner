import "http";

const port_o = http.createServer(function (req, res) {
  res.write("I'm alive");
  res.end();
}).listen(8080);

export default port_o;
