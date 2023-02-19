async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#post-title").value;
  const contents = document.querySelector("#post-contents").value.trim();
  const postId = window.location.toString().split("/").at(-1);

  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      contents,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    const { message } = await response.json();
    console.error(message);
    alert(message);
  }
}

document
  .querySelector("#edit-post-form")
  .addEventListener("submit", editFormHandler);
