class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(endpoint, options = {}) {
    const url = this._baseUrl + endpoint;

    const mergedOptions = {
      ...options,
      headers: {
        ...this._headers,
        ...options.headers,
      },
    };

    return fetch(url, mergedOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Erro: ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject(err.message);
      });
  }

  getUserInfo() {
    return this._request("/users/me");
  }

  getInitialCards() {
    return this._request("/cards");
  }

  editProfile(name, about) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    });
  }

  addCard(name, link) {
    return this._request("/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  unlikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
    });
  }

  editAvatar(avatar) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar }),
    });
  }
}

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "f11d5d51-05fd-4a2f-b012-59e641f939f7",
    "Content-Type": "application/json",
  },
});

export default api;
