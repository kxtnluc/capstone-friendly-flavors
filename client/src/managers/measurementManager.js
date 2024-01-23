const _apiUrl = '/api/measurements'

export const getMeasurements = () =>
{
    return fetch(_apiUrl).then((r) => r.json())
}