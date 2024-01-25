const _apiUrl = '/api/recipes'

export const getRecipeById = (id) => {
    return fetch(_apiUrl + "/" + id).then((r) => r.json())
}

export const postCompositeRecipe = (compositeRecipe) => {
    return fetch(_apiUrl+"/composite", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(compositeRecipe),
    }).then((res) => res.json);

}