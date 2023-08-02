class Api {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResult);
  }

  getCards() {
    return this._request(`${this.url}/cards`, {
      headers: this.headers,
      credentials: 'include',
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
      credentials: 'include',
    });
  }

  getUserData() {
    return this._request(`${this.url}/users/me`, {
      method: "GET",
      headers: this.headers,
      credentials: 'include',
    });
  }

  editUserData({ name, about }) {
    return this._request(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name: name, about: about }),
      credentials: 'include',
    });
  }

  editAvatar({ avatar }) {
    return this._request(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
      credentials: 'include',
    });
  }

  putLike(id) {
    return this._request(`${this.url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.headers,
      credentials: 'include',
    });
  }

  removeLike(id) {
    return this._request(`${this.url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
      credentials: 'include',
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
      credentials: 'include',
    });
  }
}

export const api = new Api({
  url: `https://api.mesto.nutus.nomoredomains.xyz`,
  headers: {
    "Content-Type": "application/json",
  },
});
