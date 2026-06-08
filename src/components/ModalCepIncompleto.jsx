import { Modal, Button } from 'react-bootstrap';

function ModalCepIncompleto({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-warning">Atenção</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Formato de CEP inválido!</p>

        <p>O campo deve conter exatamente
          <strong> 8 dígitos</strong>
           numéricos para realizar a pesquisa.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={onClose}>
          Entendido
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCepIncompleto;