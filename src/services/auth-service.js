export const profile = () =>
    api.post(`${AUTH_API}/profile`)
        .then(response => response.data);

export const Logout = (user) =>
    api.post(`${AUTH_API}/logout`, user)
        .then(response => response.data);

export const Login = (credentials) =>
    api.post(`${AUTH_API}/login`, credentials)
        .then(response => response.data);