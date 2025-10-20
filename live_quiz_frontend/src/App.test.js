import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation and Lobby by default', () => {
  render(<App />);
  // Sidebar buttons
  expect(screen.getByRole('button', { name: /Lobby/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Play/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Leaderboard/i })).toBeInTheDocument();
  // Lobby title
  expect(screen.getByText(/Lobby/i)).toBeInTheDocument();
  // Name input
  expect(screen.getByPlaceholderText(/Enter your display name/i)).toBeInTheDocument();
});
