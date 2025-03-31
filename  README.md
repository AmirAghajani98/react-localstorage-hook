# react-localstorage-hook

A React hook for managing localStorage with expiration support.

## Installation

```bash
npm install react-localstorage-hook
```

## Usage

```typescript
import { useLocalStorageWithExpiry } from "react-localstorage-hook";

function App() {
  // Store data for 60 minutes
  const [value, setValue] = useLocalStorageWithExpiry(
    "my-key",
    "initial value",
    60
  );

  return (
    <div>
      <p>Current value: {value}</p>
      <button onClick={() => setValue("new value")}>Update value</button>
    </div>
  );
}
```

## API

### useLocalStorageWithExpiry

```typescript
function useLocalStorageWithExpiry<T>(
  key: string,
  initialValue: T,
  expiryInMinutes?: number
): [T, (value: T) => void];
```

#### Parameters

- `key`: The localStorage key to store the value under
- `initialValue`: The initial value if no stored value exists
- `expiryInMinutes`: Optional. The number of minutes until the stored value expires

#### Returns

An array containing:

1. The current value
2. A function to update the value

## License

MIT
