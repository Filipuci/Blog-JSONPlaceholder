// https://jsonplaceholder.typicode.com/posts



async function readPosts() {
  let post = document.querySelector(".posts");
  post.innerHTML = 'Carregando...';

  let response = await fetch("https://jsonplaceholder.typicode.com/posts");
  let json = await response.json();

  if (json.length > 0) {
    post.innerHTML = '';
    for (let i in json) {
      postHtml = `<h1>${json[i].title}</h1> ${json[i].body} <hr/>`
      post.innerHTML += postHtml;
    }
  } else {
    post.innerHTML = 'Nenhum post para exibir';
  }

}

async function addNewPost(title, body) {
  await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        body,
        userId: 2
      })
    }
  );

  document.querySelector("#titleField").value = '';
  document.querySelector("#bodyField").value = '';

  readPosts();
}


document.querySelector("#insertButton").addEventListener("click", () => {
  let title = document.querySelector("#titleField").value;
  let body = document.querySelector("#bodyField").value;

  if (title && body) {
    addNewPost(title, body);
  } else {
    alert("Preencha todos os campos.")
  }
})

readPosts();