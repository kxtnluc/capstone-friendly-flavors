const _apiUrl = '/api/ingredients'

export const getAllIngredients = () =>
{
    return fetch(_apiUrl).then((r) => r.json())
}

export const getIngredientByName = (name) =>
{
    return fetch(_apiUrl+"/"+name).then((r) => r.json())
}