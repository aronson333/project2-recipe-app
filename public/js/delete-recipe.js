async function deleteRecipeHandler(recipeId) {
  recipeId = recipeId || window.location.toString().split("/").at(-1);

  const response = await fetch(`/api/recipes/${recipeId}`, {
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
