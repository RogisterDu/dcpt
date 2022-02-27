const getToken = () => {
  return localStorage.getItem('token');
};

const removeToken = () => {
  localStorage.removeItem('token');
};

const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export { getToken, setToken, removeToken };
