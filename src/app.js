const feedDisplay = document.querySelector("#feed");

fetch("https://untitled-oe68qi35pcal.runkit.sh/")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((article) => {
      const title = `<h3>` + article.title + `</h3>`;
      feedDisplay.insertAdjacentHTML("beforeend", title);
    });
  })
  .catch((err) => console.log(err));
