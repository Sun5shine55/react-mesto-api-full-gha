class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.apiToken = options.headers.authorization;
    this.contentType = options.headers.contentType;
    this._headers = options.headers;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.message}` );
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editUserData({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  addCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  changeLikeCardStatus(cardId, likeStatus) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: `${likeStatus ? "DELETE" : "PUT"}`,
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

export const api = new Api({
  url: `https://api.mesto.nutus.nomoredomains.xyz`,
  headers: {
    "Content-Type": "application/json",
  },
});
