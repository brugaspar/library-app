import { useState } from 'react';
import { ImBooks } from 'react-icons/im';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import Table from '../../components/Table';

import './styles.css';

const Home = () => {
  const [authorModal, setAuthorModal] = useState(false);
  const [bookModal, setBookModal] = useState(false);

  const authorToggle = () => setAuthorModal(!authorModal);

  const bookToggle = () => setBookModal(!bookModal);

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="title">
          <ImBooks size={72} color="#333" />
          <h1>Biblioteca</h1>
        </div>

        <div className="options">
          <button className="btn btn-secondary" onClick={authorToggle}>Cadastrar autores</button>
          <button className="btn btn-secondary" onClick={bookToggle}>Cadastrar livros</button>
        </div>
      </div>

      <div className="home-content">
        <Table />
      </div>


      <Modal isOpen={authorModal} toggle={authorToggle}>
        <ModalHeader toggle={authorToggle}>
          <h2>Cadastro de autor</h2>
        </ModalHeader>
        <ModalBody>
          <label className="modal-label" htmlFor="name">Nome do autor</label>
          <input
            type="text"
            id="name"
            placeholder="Nome"
            className="form-control"
          />
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={authorToggle}>Cadastrar</button>{' '}
          <button className="btn btn-danger" onClick={authorToggle}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={bookModal} toggle={bookToggle}>
        <ModalHeader toggle={bookToggle}>
          <h2>Cadastro de livro</h2>
        </ModalHeader>
        <ModalBody className="modal-body">
          <label className="modal-label" htmlFor="title">Título do livro</label>
          <input
            type="text"
            id="title"
            placeholder="Título"
            className="form-control"
          />

          <label className="modal-label" htmlFor="author">Autor do livro</label>
          <select id="author" className="form-control">
            <option value="0" disabled>Selecione...</option>
            <option value="1">Machado de Assis</option>
          </select>

          <div className="modal-check">
            <label className="modal-label check-label" htmlFor="author">Emprestado:</label>
            <input type="checkbox" className="modal-input" />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={bookToggle}>Cadastrar</button>{' '}
          <button className="btn btn-danger" onClick={bookToggle}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Home;