import { useEffect, useState } from 'react';
import { ImBooks } from 'react-icons/im';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import Table from '../../components/Table';

import api from '../../services/api';

import './styles.css';

const Home = () => {
  const [authorModal, setAuthorModal] = useState(false);
  const [bookModal, setBookModal] = useState(false);

  const [authorId, setAuthorId] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [borrowed, setBorrowed] = useState(false);

  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);

  const authorToggle = () => setAuthorModal(!authorModal);

  const bookToggle = () => setBookModal(!bookModal);

  const handleAuthorRegister = async (event) => {
    event.preventDefault();

    await api.post('authors', { name: authorName });

    loadAuthors();
    setAuthorName('');
    authorToggle();
  }

  const handleBookRegister = async (event) => {
    event.preventDefault();

    await api.post('books', {
      title: bookTitle,
      authorId,
      status: 'borrowed'
    });

    loadBooks();
    setBookTitle('');
    setAuthorId(0);
    setBorrowed(false);
    bookToggle();
  }

  const loadAuthors = async () => {
    const response = await api.get('authors');

    setAuthors(response.data);
  }

  const loadBooks = async () => {
    const response = await api.get('books');

    setBooks(response.data);
  }

  useEffect(() => {
    loadAuthors();
    loadBooks();
  }, []);

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
        <Table books={books} />
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
            value={authorName}
            onChange={event => setAuthorName(event.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={handleAuthorRegister}>Cadastrar</button>{' '}
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
            value={bookTitle}
            onChange={event => setBookTitle(event.target.value)}
          />

          <label className="modal-label" htmlFor="author">Autor do livro</label>
          <select
            id="author"
            className="form-control"
            value={authorId}
            onChange={event => setAuthorId(event.target.value)}
          >
            <option value="0" disabled>Selecione...</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </select>

          <div className="modal-check">
            <label className="modal-label check-label" htmlFor="author">Emprestado:</label>
            <input
              type="checkbox"
              className="modal-input"
              value={borrowed}
              onChange={() => setBorrowed(!borrowed)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={handleBookRegister}>Cadastrar</button>{' '}
          <button className="btn btn-danger" onClick={bookToggle}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Home;