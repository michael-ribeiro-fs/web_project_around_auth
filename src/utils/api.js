class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(endpoint, options = {}, token) {
    const url = this._baseUrl + endpoint;

    const headers = { ...this._headers, ...options.headers };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, { ...options, headers })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Erro: ${res.status}`),
      )
      .catch((err) => Promise.reject(err.message || err));
  }

  getInitialCards(token) {
    return this._request("/cards", {}, token);
  }

  editProfile(name, about, token) {
    return this._request(
      "/users/me",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, about }),
      },
      token,
    );
  }

  addCard(name, link, token) {
    return this._request(
      "/cards",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, link }),
      },
      token,
    );
  }

  deleteCard(cardId, token) {
    return this._request(`/cards/${cardId}`, { method: "DELETE" }, token);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    return this._request(
      `/cards/${cardId}/likes`,
      { method: isLiked ? "PUT" : "DELETE" },
      token,
    );
  }

  editAvatar(avatar, token) {
    return this._request(
      "/users/me/avatar",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar }),
      },
      token,
    );
  }
}

const api = new Api({
  baseUrl: "https://se-register-api.en.tripleten-services.com/v1",
  headers: { "Content-Type": "application/json" },
});

export default api;
