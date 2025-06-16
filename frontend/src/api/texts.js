const API_URL = 'http://localhost:5000/api/texts';

function getAuthHeader() {
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

export async function getTexts() {
  try {
    const res = await fetch(API_URL, {
      headers: getAuthHeader(),
    });
    if (!res.ok) {
      if (res.status === 401) {
        // Clear invalid token
        localStorage.removeItem('jwt_token');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error('Failed to fetch texts');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching texts:', error);
    throw error;
  }
}

export async function createText(content) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ content }),
    });
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('jwt_token');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error('Failed to create text');
    }
    return res.json();
  } catch (error) {
    console.error('Error creating text:', error);
    throw error;
  }
}

export async function updateText(id, content) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify({ content }),
    });
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('jwt_token');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error('Failed to update text');
    }
    return res.json();
  } catch (error) {
    console.error('Error updating text:', error);
    throw error;
  }
}

export async function deleteText(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('jwt_token');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error('Failed to delete text');
    }
    return res.json();
  } catch (error) {
    console.error('Error deleting text:', error);
    throw error;
  }
}