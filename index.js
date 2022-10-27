const PORT = 8000;

const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const url = "https://www.imdb.com/list/ls511104898";

// app.METHOD(PATH, HANDLER);

app.get("/", function (req, res) {
  res.json("This is my webscraper");
});

app.get("/results", function (req, res) {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];

      $(".lister-item", html).each(function () {
        const title = $(this)
          .find(".lister-item-content")
          .find(".lister-item-header")
          .find("a")
          .text();
        const year = $(this)
          .find(".lister-item-content")
          .find(".lister-item-year")
          .text();
        const url = $(this).find("a").attr("href");
        const image = $(this)
          .find(".lister-item-image")
          .find("img")
          .attr("src");
        articles.push({
          title,
          year,
          url,
          image,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
