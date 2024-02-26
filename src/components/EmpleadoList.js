import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cargo, setCargo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [ContrasenaHash, setContrasenaHash] = useState("");
  const [estado, setEstado] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [modo, setModo] = useState(""); // Variable de estado para controlar el modo del modal
  const [estados, setEstados] = useState([]);
  const [camposCompletos, setCamposCompletos] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/empleados')
      .then(response => {
        setEmpleados(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
      
    axios.get('http://localhost:4000/Estado')
      .then(response => {
        setEstados(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Verificar si todos los campos están completos
    if (nombre !== "" && apellido !== "" && cargo !== "" && telefono !== "" && correo !== "" && usuario !== "" && ContrasenaHash !== "" && estado !== "") {
      setCamposCompletos(true);
    } else {
      setCamposCompletos(false);
    }
  }, [nombre, apellido, cargo, telefono, correo, usuario, ContrasenaHash, estado]);

  const handleEditarEmpleado = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setNombre(empleado.Nombre);
    setApellido(empleado.Apellido);
    setCargo(empleado.Cargo);
    setTelefono(empleado.Telefono);
    setCorreo(empleado.CorreoElectronico);
    setUsuario(empleado.Usuario);
    setContrasenaHash(empleado.ContrasenaHash);
    setEstado(empleado.Estado);

    setModo("editar"); // Establecer el modo en "editar"
    setShowModal(true);
  };

  const handleEliminarEmpleado = (empleadoID) => {
    axios.delete(`http://localhost:4000/empleados/${empleadoID}`)
      .then(response => {
        setEmpleados(empleados.filter(empleado => empleado.EmpleadoID !== empleadoID));
      })
      .catch(error => {
        console.error("Error al eliminar empleado:", error);
        alert("Error al eliminar el empleado");
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGuardarCambios = () => {
    if (modo === "agregar") {
      // Realizar una solicitud POST para agregar un nuevo empleado
      const nuevoEmpleado = {
        Nombre: nombre,
        Apellido: apellido,
        Cargo: cargo,
        Telefono: telefono,
        CorreoElectronico: correo,
        Usuario: usuario,
        ContrasenaHash: ContrasenaHash,
        Estado: estado
      };
      axios.post("http://localhost:4000/empleados", nuevoEmpleado)
        .then((response) => {
          // Actualizar la lista de empleados
          axios.get("http://localhost:4000/empleados")
            .then((response) => {
              setEmpleados(response.data);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error adding employee:", error);
          alert("Error al agregar el empleado");
        });
    } else if (modo === "editar") {
      // Realizar una solicitud PUT para editar el empleado seleccionado
      const empleadoActualizado = {
        ...empleadoSeleccionado,
        Nombre: nombre,
        Apellido: apellido,
        Cargo: cargo,
        Telefono: telefono,
        CorreoElectronico: correo,
        Usuario: usuario,
        ContrasenaHash: ContrasenaHash,
        Estado: estado
      };
      console.log('datos a insertar: ', empleadoActualizado);
      axios.put(`http://localhost:4000/empleados/${empleadoSeleccionado.EmpleadoID}`, empleadoActualizado)
        .then((response) => {
          // Actualizar la lista de empleados
          axios.get("http://localhost:4000/empleados")
            .then((response) => {
              setEmpleados(response.data);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
          alert("Error al actualizar el empleado");
        });
    }
  };

  const handleNuevoEmpleado = () => {
    // Limpiar los campos
    setNombre("");
    setApellido("");
    setCargo("");
    setTelefono("");
    setCorreo("");
    setUsuario("");
    setContrasenaHash("");
    setEstado("");
    setModo("agregar"); // Establecer el modo en "agregar"
    setShowModal(true);
  };

  const handleFiltrar = () => {
    axios.get(`http://localhost:4000/empleados?nombre=${filtroNombre}`)
      .then(response => {
        setEmpleados(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="container">
      <div className="mb-3">
        {/* Campo de filtro para el nombre */}
        <input
          type="text"
          placeholder="Filtrar por nombre"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />
        {/* Botón para aplicar el filtro */}
        <Button variant="primary" onClick={handleFiltrar}>Filtrar</Button>
        {/* Botón para agregar un nuevo empleado */}
        <Button variant="success" onClick={handleNuevoEmpleado}>Nuevo Empleado</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cargo</th>
            <th>Teléfono</th>
            <th>Correo Electrónico</th>
            <th>Usuario</th>
            {/* <th>Contraseña</th> */}
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.EmpleadoID}>
              <td>{empleado.Nombre}</td>
              <td>{empleado.Apellido}</td>
              <td>{empleado.Cargo}</td>
              <td>{empleado.Telefono}</td>
              <td>{empleado.CorreoElectronico}</td>
              <td>{empleado.Usuario}</td>
              {/* <td>{empleado.ContrasenaHash}</td> */}
              <td>{empleado.Estado}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditarEmpleado(empleado)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleEliminarEmpleado(empleado.EmpleadoID)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modo === "agregar" ? "Nuevo Empleado" : "Editar Empleado"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCargo">
              <Form.Label>Cargo</Form.Label>
              <Form.Control
                type="text"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCorreo">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCorreo">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCorreo">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={ContrasenaHash}
                onChange={(e) => setContrasenaHash(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control as="select" value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="">Seleccionar Estado</option>
                {estados.map((estado) => (
                  <option key={estado.EstadoID} value={estado.EstadoID}>
                    {estado.Estado}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
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

export default EmpleadoList;
