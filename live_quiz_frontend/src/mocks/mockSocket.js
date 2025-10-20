const listeners = {}; // event -> Set(callback)

function on(event, cb) {
  if (!listeners[event]) listeners[event] = new Set();
  listeners[event].add(cb);
}

function off(event, cb) {
  listeners[event]?.delete(cb);
}

function emit(event, payload) {
  listeners[event]?.forEach(cb => cb(payload));
}

// Simulate server tick: broadcast leaderboard updates or next question events externally controlled
let intervalId = null;

// PUBLIC_INTERFACE
export function startSimulation(tickMs = 1500) {
  if (intervalId) return;
  intervalId = setInterval(() => {
    emit('leaderboard:update', { at: Date.now() });
  }, tickMs);
}

// PUBLIC_INTERFACE
export function stopSimulation() {
  if (intervalId) clearInterval(intervalId);
  intervalId = null;
}

// PUBLIC_INTERFACE
export const socket = { on, off, emit };
