async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#post-title").value;
  const contents = document.querySelector("#post-contents").value.trim();

  const response = await fetch(`/api/posts`, {
    method: "POST",
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
  .querySelector("#new-post-form")
  .addEventListener("submit", newFormHandler);
