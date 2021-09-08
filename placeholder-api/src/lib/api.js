const API_URL = "https://jsonplaceholder.typicode.com";

const defaultFetch = async (url, body) => {
  const response = await fetch(url, body);
  const jsonData = await response.json();

  if (!response.ok) {
    throw new Error(jsonData.message || "Sth is wrong");
  }

  return jsonData;
};

export const getAllTodos = async () => {
  return await defaultFetch(`${API_URL}/todos`, { method: "GET" });
};

export const getUser = async (id) => {
  return await defaultFetch(`${API_URL}/users/${id}`, { method: "GET" });
};

export const updateTodo = async (id, body) => {
  return await defaultFetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body),
  });
};

export const deleteTodo = async (id, body) => {
  return await defaultFetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
};

export const createTodo = async (body) => {
  return await defaultFetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body),
  });
};
