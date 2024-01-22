const _apiUrl = '/api/recipes'

export const getRecipeById = (id) =>
{
    return fetch(_apiUrl+"/"+id).then((r) => r.json())
}