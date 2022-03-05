const getToken = () => {
  const token = localStorage && localStorage.getItem('token');
  return token;
};

const removeToken = () => {
  localStorage.removeItem('token');
};

const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export { getToken, setToken, removeToken };
