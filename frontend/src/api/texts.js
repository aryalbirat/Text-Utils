const API_URL = 'http://localhost:5000/api/texts';

function getAuthHeader() {
  const token = localStorage.getItem('jwt_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getTexts() {
  const res = await fetch(API_URL, {
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
  });
  if (!res.ok) throw new Error('Failed to fetch texts');
  return res.json();
}

export async function createText(content) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error('Failed to create text');
  return res.json();
}

export async function updateText(id, content) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error('Failed to update text');
  return res.json();
}

export async function deleteText(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() },
  });
  if (!res.ok) throw new Error('Failed to delete text');
  return res.json();
}