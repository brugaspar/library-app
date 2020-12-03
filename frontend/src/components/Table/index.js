import { FiTrash2, FiCheckSquare, FiXCircle } from 'react-icons/fi'
import { Table } from 'reactstrap';

import api from '../../services/api';

import './styles.css';

const TableData = ({ books, loadBooks }) => {
  const handleUpdateStatus = async (id, status) => {
    let statusId = 1;

    if (status === 1) {
      statusId = 2;
    }

    await api.put(`books/${id}`, {
      statusId
    });

    loadBooks();
  }

  const handleDeleteBook = async (id) => {
    await api.delete(`books/${id}`);

    loadBooks();
  }

  return (
    <Table bordered striped>
      <thead className="thead-dark">
        <tr>
          <th>#</th>
          <th>Título</th>
          <th>Autor</th>
          <th>Criação</th>
          <th>Edição</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => (
          <tr key={book.id}>
            <th scope="row">{book.id}</th>
            <td>{book.title}</td>
            <td>{book.author_name}</td>
            <td>{book.created_at}</td>
            <td>{book.updated_at}</td>
            <td>{book.status_name}</td>
            <td align="center">
              <button className="table-button" onClick={() => handleUpdateStatus(book.id, book.status_id)}>
                {book.status_id === 1
                  ? (
                    <FiXCircle
                      size={20}
                      color="#ca59cb"
                    />
                  )
                  : (
                    <FiCheckSquare
                      size={20}
                      color="#16a085"
                    />
                  )
                }
              </button>

              <button className="table-button" onClick={() => handleDeleteBook(book.id)}>
                <FiTrash2
                  size={20}
                  color="#c0392b"
                  className="fi-trash"
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableData;