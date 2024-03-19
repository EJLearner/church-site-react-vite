import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  .no-rows-message {
    text-align: center;
  }
`;

class Table extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  renderRowCells(row) {
    return this.props.columns.map((column) => {
      return <td key={row.id + column.name}>{row[column.name]}</td>;
    });
  }

  renderTableRows() {
    const {rows} = this.props;

    return rows.length ? (
      rows.map((row) => {
        return <tr key={row.id}>{this.renderRowCells(row)}</tr>;
      })
    ) : (
      <tr>
        <td className="no-rows-message" colSpan={this.props.columns.length}>
          No Rows
        </td>
      </tr>
    );
  }

  renderHeaderCells() {
    return this.props.columns.map((column) => {
      return <th key={column.name}>{column.label}</th>;
    });
  }

  render() {
    return (
      <StyledTable>
        <thead>
          <tr>{this.renderHeaderCells()}</tr>
        </thead>
        <tbody>{this.renderTableRows()}</tbody>
      </StyledTable>
    );
  }
}

export default Table;
