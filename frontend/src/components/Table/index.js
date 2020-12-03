import { Table } from 'reactstrap';

const TableData = () => {
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
        <tr>
          <th scope="row">1</th>
          <td>Harry Potter</td>
          <td>J.K. Rowling</td>
          <td>02/12/2020 | 15:40</td>
          <td>02/12/2020 | 22:49</td>
          <td>Disponível</td>
          <td align="center">X | Y</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Harry Potter</td>
          <td>J.K. Rowling</td>
          <td>02/12/2020 | 15:40</td>
          <td>02/12/2020 | 22:49</td>
          <td>Disponível</td>
          <td align="center">X | Y</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Harry Potter</td>
          <td>J.K. Rowling</td>
          <td>02/12/2020 | 15:40</td>
          <td>02/12/2020 | 22:49</td>
          <td>Disponível</td>
          <td align="center">X | Y</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default TableData;