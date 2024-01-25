const _apiUrl = '/api/cookbooks'

export const getCookBookByUserId = (userid) =>
{
    return fetch(_apiUrl+"/user/"+userid).then((r) => r.json())
}