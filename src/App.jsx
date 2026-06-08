import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalCepNaoEncontrado from "./components/ModalCepNaoEncontrado";
import ModalCepIncompleto from "./components/ModalCepIncompleto";

function App() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState({
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showModalIncompleto, setShowModalIncompleto] = useState(false);

  // Função chamada ao clicar no botão
  const buscarEndereco = () => {
    if (cep.length !== 8) {
      // CEP inválido: mostra o modal ou alert

      alert("Digite o CEP com 8 digitos para pesquisa");

      setShowModalIncompleto(true);
      setEndereco({
        logradouro: "",
        bairro: "",
        localidade: "",
        uf: "",
      });
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.erro) {
          setEndereco({
            logradouro: data.logradouro,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf,
          });
        } else {
          // CEP não encontrado
          setShowModal(true);
          setEndereco({
            logradouro: "",
            bairro: "",
            localidade: "",
            uf: "",
          });
        }
      });
  };

  // Atualiza o campo do CEP, aceitando apenas números
  const handleChangeCep = (e) => {
    const valor = e.target.value.replace(/\D/g, "");
    setCep(valor);
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Consulta de Endereço via CEP</h1>

      <Form>
        <Form.Group className="mb-3" controlId="formCep">
          <Form.Label>CEP</Form.Label>
          <div className="d-flex align-items-center gap-2">
            <Form.Control
              type="text"
              size="sm"
              placeholder="Digite o CEP"
              value={cep}
              onChange={handleChangeCep}
              maxLength={8}
              style={{ width: "150px" }}
            />
            <Button variant="primary" onClick={buscarEndereco}>
              Buscar CEP
            </Button>
          </div>
        </Form.Group>

        {/* Campos preenchidos pela API */}
        <Form.Group className="mb-3" controlId="formLogradouro">
          <Form.Label>Logradouro</Form.Label>
          <Form.Control 
            type="text" 
            value={endereco.logradouro} 
            onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })} 
          />
          {/* Para tornar o campo editável mude readOnly para: onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })} */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBairro">
          <Form.Label>Bairro</Form.Label>
          <Form.Control type="text" value={endereco.bairro} readOnly />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCidade">
          <Form.Label>Cidade</Form.Label>
          <Form.Control type="text" value={endereco.localidade} readOnly />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEstado">
          <Form.Label>Estado</Form.Label>
          <Form.Control type="text" value={endereco.uf} readOnly />
        </Form.Group>
      </Form>

      {/* Modal para CEP não encontrado ou inválido */}
      <ModalCepNaoEncontrado
        show={showModal}
        onClose={() => setShowModal(false)}
      />

      {/* Modal para CEP vazio ou menos de 8 digitos */}
      <ModalCepIncompleto
        show={showModalIncompleto}
        onClose={() => setShowModalIncompleto(false)}
      />
    </Container>
  );
}

export default App;