async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#recipe-title").value;
  const difficulty = document.querySelector("#recipe-difficulty").value.trim();
  const ingredients = document
    .querySelector("#recipe-ingredients")
    .value.trim();
  const instructions = document
    .querySelector("#recipe-instructions")
    .value.trim();

  const body = JSON.stringify({
    title,
    difficulty,
    ingredients,
    instructions,
  });

  console.log(body);

  const response = await fetch(`/api/recipes`, {
    method: "POST",
    body,
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
  .querySelector("#new-recipe-form")
  .addEventListener("submit", newFormHandler);
