const _apiUrl = '/api/recipes'

export const getRecipeById = (id) => {
    return fetch(_apiUrl + "/" + id).then((r) => r.json())
}

export const getAllRecipes = () => {
    return fetch(_apiUrl).then((r) =>r.json())
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

export const getRecipesByCookBookId = (cookbookid) => {
    return fetch(_apiUrl+"?cookBookId="+cookbookid).then((r) =>r.json())

}

export const deleteRecipe = (recipeid) => {
    return fetch(_apiUrl+"/"+recipeid, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    })
}

export const updateRecipe = (recipeObj) => {
    return fetch(_apiUrl+"/"+recipeObj.id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(recipeObj)
    })
}

export const deleteRIs = (riArray) => {
    return fetch(_apiUrl+"/adddelete/ri", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(riArray)
    })
}