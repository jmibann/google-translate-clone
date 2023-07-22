import { test, expect, vi } from 'vitest';
import { render }  from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { translate } from './services';

vi.mock('./services');

test('My app works as expected', async() => {
  const user = userEvent.setup();
  vi.mocked(translate).mockImplementation(
    () => Promise.resolve('hola mundo!')
  );

  const app = render(<App />);

  expect(app.getByText(/Google Translate/i)).toBeTruthy();

  const textAreaFrom = app.getByPlaceholderText(/enter a text/i);
  await user.type(textAreaFrom, 'Hello World!');
  const result = await app.findByDisplayValue(/hola/i)
  expect(result).toBeTruthy();
});