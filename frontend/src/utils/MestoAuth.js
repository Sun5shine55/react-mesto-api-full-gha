class MestoAuth {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  register = ({ email, password }) => {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResult);
  };

  authorize = ({ email, password }) => {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResult);
  };

  checkToken = (token) => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResult);
  };

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  logout () {
    return fetch(`${this._url}/signout`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
    .then(res => {
      return this._checkResult(res)
    })
  };
}

const auth = new MestoAuth({
  baseUrl: "https://api.mesto.nutus.nomoredomains.xyz"
});

export default auth;