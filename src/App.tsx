/** @format */

import { AppProvider } from "./app/providers";
import { AppRouter } from "./app/providers/router";

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
