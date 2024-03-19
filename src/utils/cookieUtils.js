function getCookie(key) {
  const cookies = document.cookie.split('; ');

  const myCookie = cookies.find((cookie) => cookie.split('=')[0] === key);
  const cookieValue = myCookie?.split('=')[1];

  return cookieValue && decodeURIComponent(cookieValue);
}

export {getCookie};
