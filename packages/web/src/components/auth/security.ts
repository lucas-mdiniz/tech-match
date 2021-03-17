export const getToken = (key : string) => {
  const token = localStorage.getItem(key);

  return `Bearer ${token}`;
}

export const updateToken = (key : string , token : string) => {
  if(!token || token === '' || token === null){
    localStorage.removeItem(key);
    return;
  }

  localStorage.setItem(key, token);
}