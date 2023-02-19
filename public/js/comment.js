async function commentFormHandler(event) {
  event.preventDefault();

  const contents = document.querySelector("#contents").value.trim();

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
  const postId = window.location.toString().split("/").at(-1);

  if (contents) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id: postId,
        contents,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      const { message } = await response.json();
      console.error(message);
      alert(message);
    }
  }
}

document
  .querySelector("#comment-form")
  .addEventListener("submit", commentFormHandler);
