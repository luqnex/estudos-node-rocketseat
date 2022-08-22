const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "Ok",
      })
    );
  })
  .listen(3001, () => console.log("servidor na porta 3001"));
