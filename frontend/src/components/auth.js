export function isLoggedIn(){
    return localStorage.getItem('token') ? true : false;
}

export function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}