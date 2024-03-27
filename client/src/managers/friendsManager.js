const _apiUrl = "/api/friends"

export const getFriendsById = (oneUserId, twoUserId) => {
    return fetch(_apiUrl+"/"+oneUserId+"?twoUserId="+twoUserId).then((r) => r.json());
}

export const addFriendRequest = (friendRequestObject) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(friendRequestObject),
    }).then((res) => res.json);
}

export const deleteDeclineOrCancelRequest = (friendObjId) => {
    return fetch(_apiUrl+"/"+friendObjId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const acceptFriendRequest = (friendObjId) => {
    return fetch(_apiUrl + "/" + friendObjId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })
}