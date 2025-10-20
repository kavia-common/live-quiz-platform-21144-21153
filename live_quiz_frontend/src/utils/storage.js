const KEY = 'lq_session_v1';

// PUBLIC_INTERFACE
export function saveSession({ name, quizId, userId }) {
  const data = { name, quizId, userId };
  localStorage.setItem(KEY, JSON.stringify(data));
}

// PUBLIC_INTERFACE
export function loadSession() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export function clearSession() {
  localStorage.removeItem(KEY);
}
