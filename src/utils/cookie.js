const setCookie = (tokens) => {
  document.cookie = `accessToken=${tokens.accessToken}; Max-Age=${
    1 * 24 * 60 * 60 // 1day
  }`;
  document.cookie = `refreshToken=${tokens.refreshToken}; Max-Age=${
    30 * 24 * 60 * 60 // 30day
  }`;
};

const getCookie = (cookieName) => {
  return document.cookie
    .split(";")
    .find((token) => token.trim().split("=")[0] === cookieName)?.split("=")[1];
};

export { getCookie, setCookie };
