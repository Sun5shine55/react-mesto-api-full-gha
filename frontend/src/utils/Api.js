class Api {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
    this._token = headers["authorization"];
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResult);
  }

  getCards() {
    return this._request(`${this.url}/cards`, {
      headers: this.headers,
    });
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  addCard({ placename, link }) {
    return this._request(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name: placename, link: link }),
    });
  }

  getUserData() {
    return this._request(`${this.url}/users/me`, {
      method: "GET",
      headers: this.headers,
    });
  }

  editUserData({ name, about }) {
    return this._request(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name: name, about: about }),
    });
  }

  editAvatar({ avatar }) {
    return this._request(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  putLike(id) {
    return this._request(`${this.url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  removeLike(id) {
    return this._request(`${this.url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.removeLike(id);
    } else {
      return this.putLike(id);
    }
  }

  deleteCard(id) {
    return this._request(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }
}

export const api = new Api({
  url: `https://api.mesto.nutus.nomoredomains.xyz`,
  headers: {
    "Content-Type": "application/json",
  },
});
