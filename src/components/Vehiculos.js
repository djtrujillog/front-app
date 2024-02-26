import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const VehiculoList = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [anio, setAnio] = useState("");
  const [precioGerente, setPrecioGerente] = useState("");
  const [precioWeb, setPrecioWeb] = useState("");
  const [precioLista, setPrecioLista] = useState("");
  const [imagen, setImagen] = useState("");
  const [filtromodelo, setFiltroModelo] = useState("");
  const [modo, setModo] = useState("");
  const [camposCompletos, setCamposCompletos] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/vehiculos')
      .then(response => {
        setVehiculos(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
   }, []);

  useEffect(() => {
    // Verificar si todos los campos están completos
    if (modelo !== "" && marca !== "" && anio !== "" && precioGerente !== "" && precioWeb !== "" && precioLista !== "") {
      setCamposCompletos(true);
    } else {
      setCamposCompletos(false);
    }
  }, [modelo, marca, anio, precioGerente, precioWeb, precioLista]);

  const handleEditarVehiculo = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setModelo(vehiculo.Modelo);
    setMarca(vehiculo.MarcaID);
    setAnio(vehiculo.Anio);
    setPrecioGerente(vehiculo.PrecioGerente);
    setPrecioWeb(vehiculo.PresioWeb);
    setPrecioLista(vehiculo.PrecioLista);
    setImagen(vehiculo.Imagen);

    setModo("editar");
    setShowModal(true);
  };

  const handleEliminarVehiculo = (vehiculoID) => {
    axios.delete(`http://localhost:4000/vehiculos/${vehiculoID}`)
      .then(response => {
        setVehiculos(vehiculos.filter(vehiculo => vehiculo.VehiculoID !== vehiculoID));
      })
      .catch(error => {
        console.error("Error al eliminar vehículo:", error);
        alert("Error al eliminar el vehículo");
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleGuardarCambios = () => {
    if (modo === 'editar') {
      axios.put(`http://localhost:4000/vehiculos/${vehiculoSeleccionado.VehiculoID}`, {
        Modelo: modelo,
        Marca: marca,
        Anio: anio,
        PrecioGerente: precioGerente,
        PresioWeb: precioWeb,
        PrecioLista: precioLista,
        Imagen: imagen,
      })
      .then(response => {
        setShowModal(false);
      })
      .catch(error => {
        console.error("Error al guardar cambios:", error);
      });
    } else if (modo === 'agregar') {
      axios.post(`http://localhost:4000/vehiculos`, {
        Modelo: modelo,
        Marca: marca,
        Anio: anio,
        PrecioGerente: precioGerente,
        PresioWeb: precioWeb,
        PrecioLista: precioLista,
        Imagen: imagen,
      })
      .then(response => {
        setShowModal(false);
      })
      .catch(error => {
        console.error("Error al agregar nuevo vehículo:", error);
      });
    }
  };

  const handleNuevoVehiculo = () => {
    // Limpiar los campos
    setModelo("");
    setMarca("");
    setAnio("");
    setPrecioGerente("");
    setPrecioWeb("");
    setPrecioLista("");
    setImagen("");
    setModo("agregar"); // Establecer el modo en "agregar"
    setShowModal(true);
  };

  const handleFiltrar = () => {
    axios.get(`http://localhost:4000/empleados?nombre=${filtromodelo}`)
      .then(response => {
        setVehiculos(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="container">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Filtrar por modelo"
          value={filtromodelo}
          onChange={(e) => setFiltroModelo(e.target.value)}
        />
        <Button variant="primary" onClick={handleFiltrar}>Filtrar</Button>
         <Button variant="success" onClick={handleNuevoVehiculo}>Nuevo Vehículo</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Año</th>
            <th>Precio Gerente</th>
            <th>Precio Web</th>
            <th>Precio Lista</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.VehiculoID}>
              <td>{vehiculo.Modelo}</td>
              <td>{vehiculo.Marca}</td>
              <td>{vehiculo.Anio}</td>
              <td>{vehiculo.PrecioGerente}</td>
              <td>{vehiculo.PresioWeb}</td>
              <td>{vehiculo.PrecioLista}</td>
              <td>{vehiculo.Imagen}</td>


              <td>
                <Button variant="primary" onClick={() => handleEditarVehiculo(vehiculo)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleEliminarVehiculo(vehiculo.VehiculoID)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
  
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modo === "agregar" ? "Nuevo Vehículo" : "Editar Vehículo"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formModelo">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                value={marca}
                onChange={(e) => setModelo(e.target.value)}
              />
            </Form.Group>
            {/* Agrega los campos restantes del formulario según sea necesario */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleGuardarCambios} disabled={!camposCompletos}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VehiculoList;
