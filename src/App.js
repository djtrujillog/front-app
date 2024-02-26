import React from "react";
// import EmpleadoList from './components/EmpleadoList';
import Vehiculos from './components/Vehiculos';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row justify-content-center">
            <h1 className="text-center">Listado de Empleados si que si</h1>
          </div>
        </div>
      </header>
      <main>
        {/* <EmpleadoList /> */}
        <Vehiculos/>
      </main>
    </div>
  );
}

export default App;
