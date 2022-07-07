`use strict`;

const endpoint = "http://127.0.0.1:5000/Articles";
const req = new Request(endpoint);
const board = document.getElementById("article-board");
const titleInput = document.getElementById("title-input");
const contentInput = document.getElementById("content-input");
const postButton = document.getElementById("post-button");
const navigationList = document.getElementById("article-fragments");

DisplayArticles();

postButton.addEventListener("click", function () {
  const title = titleInput.value;
  const content = contentInput.value;
  if (title == "" || content == "") {
    console.log(title, content);
    alert("The content and title fields can't be empty");
    return 0;
  }

  CreateArticle(title, content);
  board.innerHTML = "";
  navigationList.innerHTML = "";
  DisplayArticles();
});

async function DisplayArticles() {
  const response = await (await fetch(req)).json();

  response.forEach((element) => {
    const title = document.createElement("h2");
    const content = document.createElement("p");
    const container = document.createElement("div");
    const deleteButton = document.createElement("button");

    CreateFragmentLink(element["title"]);

    container.className = "article";
    container.id = element["title"];
    title.textContent = element["title"];
    content.textContent = element["content"];
    deleteButton.textContent = "Delete";

    container.append(deleteButton, title, content);
    deleteButton.addEventListener("click", function () {
      const deleteRequest = new XMLHttpRequest();
      const linkElement = document.getElementById(
        `${element["title"]}-fragment`
      );
      linkElement.remove();
      deleteRequest.open("DELETE", endpoint + `?title=${element["title"]}`);
      deleteRequest.send();

      container.remove();
    });

    board.append(container);
  });
}

function CreateArticle(title, content) {
  const post = new XMLHttpRequest();
  const params = `?title=${title}&content=${content}`;
  CreateFragmentLink(title);
  post.open("POST", endpoint + params);
  post.send();
}

function CreateFragmentLink(id) {
  const liElement = document.createElement("li");
  const aElement = document.createElement("a");
  aElement.text = id;
  liElement.id = `${id}-fragment`;

  aElement.href = `#${id}`;
  liElement.append(aElement);
  navigationList.append(liElement);
}
