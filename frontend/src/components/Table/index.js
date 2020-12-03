import { FiTrash2, FiCheckSquare } from 'react-icons/fi'
import { Table } from 'reactstrap';

import './styles.css';

const TableData = ({ books }) => {
  return (
    <Table bordered>
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
              <FiCheckSquare
                size={20}
                color="#16a085"
                className="fi-check"
              />

              <FiTrash2
                size={20}
                color="#c0392b"
                className="fi-trash"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableData;