const _apiUrl = '/api/cookbooks'

export const getCookBookByUserId = (userid) =>
{
    return fetch(_apiUrl+"/user/"+userid).then((r) => r.json())
}

export const createCookBook = (cookbook) =>
{
    return fetch(_apiUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cookbook)
    })
}

export const updateCookBook = (updates) =>
{
    return fetch(_apiUrl+"/"+updates.id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updates)
    })
}

export const getAllCookBooks = () =>
{
    return fetch(_apiUrl).then((r) => r.json())
}