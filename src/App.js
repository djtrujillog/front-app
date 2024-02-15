import React from "react";
import EmpleadoList from './components/EmpleadoList';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row justify-content-center">
            <h1 className="text-center">Listado de Empleados</h1>
          </div>
        </div>
      </header>
      <main>
        <EmpleadoList />
      </main>
    </div>
  );
}

export default App;
