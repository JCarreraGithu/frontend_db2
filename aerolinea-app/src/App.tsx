
import DefinicionRutas from './routes/DefinicionRutas';
import { UsuarioProvider } from './autenticacion/contextos/UsuarioContexto';

const App = () => {
  return (
    <UsuarioProvider>
      <DefinicionRutas />
    </UsuarioProvider>
  );
};

export default App;
