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