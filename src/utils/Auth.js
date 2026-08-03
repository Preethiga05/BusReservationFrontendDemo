export function saveLoginDetails(response, username) {

    localStorage.setItem("token", response.data.token);

    localStorage.setItem("role", response.data.role);

    localStorage.setItem("expiration", response.data.expiration);

    localStorage.setItem("username", username);

}

export function logout() {

    localStorage.clear();

}

export function getToken() {

    return localStorage.getItem("token");

}

export function getRole() {

    return localStorage.getItem("role");

}

export function getUsername() {

    return localStorage.getItem("username");

}