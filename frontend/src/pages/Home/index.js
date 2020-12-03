import { useEffect, useState } from 'react';
import { ImBooks } from 'react-icons/im';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import Table from '../../components/Table';

import api from '../../services/api';

import './styles.css';

const Home = () => {
  const [authorModal, setAuthorModal] = useState(false);
  const [bookModal, setBookModal] = useState(false);

  const [statusId, setStatusId] = useState(0);
  const [authorId, setAuthorId] = useState(0);

  const [authorName, setAuthorName] = useState('');
  const [bookTitle, setBookTitle] = useState('');

  const [authors, setAuthors] = useState([]);
  const [status, setStatus] = useState([]);
  const [books, setBooks] = useState([]);

  const authorToggle = () => setAuthorModal(!authorModal);

  const bookToggle = () => setBookModal(!bookModal);

  const reset = () => {
    setBookTitle('');
    setAuthorId(0);
    setStatusId(0);
    setAuthorName('');
  }

  const handleAuthorRegister = async (event) => {
    event.preventDefault();

    try {
      await api.post('authors', { name: authorName });

      loadAuthors();
      authorToggle();

      reset();
    } catch {
      alert('Algo de errado não está certo. Tente novamente!');

      reset();
    }
  }

  const handleBookRegister = async (event) => {
    event.preventDefault();

    try {
      if (authorId === 0 || statusId === 0) {
        throw new Error;
      }

      await api.post('books', {
        title: bookTitle,
        authorId,
        statusId
      });

      loadBooks();
      bookToggle();

      reset();
    } catch {
      alert('Algo de errado não está certo. Tente novamente!');

      reset();
    }
  }

  const loadAuthors = async () => {
    const response = await api.get('authors');

    setAuthors(response.data);
  }

  const loadStatus = async () => {
    const response = await api.get('status');

    setStatus(response.data);
  }

  const loadBooks = async () => {
    const response = await api.get('books');

    setBooks(response.data);
  }

  useEffect(() => {
    loadAuthors();
    loadStatus();
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
        <Table books={books} loadBooks={loadBooks} />
      </div>


      <Modal isOpen={authorModal} toggle={authorToggle} autoFocus={false}>
        <ModalHeader toggle={authorToggle}>
          <h2>Cadastro de autor</h2>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleAuthorRegister}>
            <label className="modal-label" htmlFor="name">Nome do autor</label>
            <input
              type="text"
              id="name"
              placeholder="Nome"
              className="form-control"
              required
              autoFocus={true}
              value={authorName}
              onChange={event => setAuthorName(event.target.value)}
            />
            <ModalFooter>
              <button className="btn btn-success" type="submit">Cadastrar</button>{' '}
              <button className="btn btn-danger" type="button" onClick={authorToggle}>Cancelar</button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>

      <Modal isOpen={bookModal} toggle={bookToggle} autoFocus={false}>
        <ModalHeader toggle={bookToggle}>
          <h2>Cadastro de livro</h2>
        </ModalHeader>
        <ModalBody className="modal-body">
          <form onSubmit={handleBookRegister}>
            <label className="modal-label" htmlFor="title">Título do livro</label>
            <input
              type="text"
              id="title"
              placeholder="Título"
              className="form-control"
              required
              autoFocus={true}
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

            <div>
              <label className="modal-label" htmlFor="status">Status:</label>
              <select
                id="status"
                className="form-control"
                value={statusId}
                onChange={event => setStatusId(event.target.value)}
              >
                <option value="0" disabled>Selecione...</option>
                {status.map(st => (
                  <option key={st.id} value={st.id}>{st.name}</option>
                ))}
              </select>
            </div>
            <ModalFooter>
              <button className="btn btn-success" type="submit">Cadastrar</button>{' '}
              <button className="btn btn-danger" type="button" onClick={bookToggle}>Cancelar</button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Home;