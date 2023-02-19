async function deletePostHandler(event) {
  event.preventDefault();

  const postId = window.location.toString().split("/").at(-1);

  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
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
  .querySelector("#delete-post-button")
  .addEventListener("click", deletePostHandler);
