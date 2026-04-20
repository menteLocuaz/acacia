import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyle';
import { AppRouter } from './routers/AppRouter';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
