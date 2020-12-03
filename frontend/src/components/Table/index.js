import { Table } from 'reactstrap';

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
            <td>{book.status}</td>
            <td align="center">X | Y</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableData;