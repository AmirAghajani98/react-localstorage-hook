# react-localstorage-hook-with-expiry 📦⏳

A simple yet powerful React hook for managing localStorage with expiration support

## ✨ Features

- 🕒 Automatic data expiration
- 🔄 Seamless sync between localStorage and component state
- 🛡️ SSR compatible (Next.js ready)
- 💪 TypeScript support out of the box
- 🚀 Zero dependencies

## Installation

```bash
npm install react-localstorage-hook-with-expiry
# or
yarn add react-localstorage-hook-with-expiry
```

## Basic Usage

```jsx
import useLocalStorage from 'react-localstorage-hook-with-expiry';

function MyComponent() {
  const [token, setToken] = useLocalStorage('auth_token', null, {
    expiry: 24 * 60 * 60 * 1000 // 24 hours
  });

  // ...
}
```

## Parameters

| Parameter     | Type     | Default | Description                     |
|--------------|----------|---------|---------------------------------|
| key          | string   | -       | localStorage key                |
| initialValue | any      | -       | Initial value                   |
| options      | object   | {}      | Optional configuration          |

### Options

| Option  | Type     | Default | Description                     |
|---------|----------|---------|---------------------------------|
| expiry  | number   | null    | Expiration time in milliseconds |
| encrypt | boolean  | false   | Enable data encryption          |

## Advanced Examples

### TypeScript Usage

```tsx
const [user, setUser] = useLocalStorage<User>('user', null, {
  expiry: 3600000 // 1 hour
});
```

### Removing Data

```jsx
const [data, setData, removeData] = useLocalStorage('temp_data');
// ...
removeData(); // Remove from localStorage
```

## 🤝 Contributing

Suggestions and PRs are always welcome!

## 📜 License

MIT
