import { Modal, Button } from 'react-bootstrap';

function ModalCepNaoEncontrado({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">Aviso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>O CEP digitado não foi encontrado na base de dados.</p>
        <p>Por favor, verifique o número e tente novamente.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCepNaoEncontrado;