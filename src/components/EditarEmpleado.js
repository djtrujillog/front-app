import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function EditarEmpleadoForm({ empleado, onClose }) {
  const [nombre, setNombre] = useState(empleado.Nombre);
  const [apellido, setApellido] = useState(empleado.Apellido);
  const [cargo, setCargo] = useState(empleado.Cargo);
  const [telefono, setTelefono] = useState(empleado.Telefono);
  const [correo, setCorreo] = useState(empleado.CorreoElectronico);

  const handleGuardarCambios = () => {
    // Aquí podrías enviar los datos actualizados del empleado al servidor
    const empleadoActualizado = {
      ...empleado,
      Nombre: nombre,
      Apellido: apellido,
      Cargo: cargo,
      Telefono: telefono,
      CorreoElectronico: correo,
    };
    console.log("Empleado actualizado:", empleadoActualizado);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Empleado</Modal.Title>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default EditarEmpleadoForm;
