import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import {Flex} from 'grid-emotion';

import Button from 'app/components/button';

export default class Pagination extends React.Component {
  static propTypes = {
    getNextPage: PropTypes.func.isRequired,
    getPreviousPage: PropTypes.func.isRequired,
    baseQuery: PropTypes.shape({
      query: PropTypes.shape({
        limit: PropTypes.number.isRequired,
      }).isRequired,
      current: PropTypes.string.isRequired,
      next: PropTypes.string,
      previous: PropTypes.string,
      data: PropTypes.shape({
        data: PropTypes.array.isRequired,
      }).isRequired,
    }).isRequired,
  };

  getPageNumber() {
    const {baseQuery} = this.props;
    const startRange = parseInt(baseQuery.current.split(':')[1], 10);
    const endRange = startRange + baseQuery.query.limit;
    const dataLength = baseQuery.data.data.length;

    if (dataLength) {
      const from = startRange + 1;
      const to = dataLength < baseQuery.query.limit ? from + dataLength : endRange;

      return (
        <NumberResultsShown>
          Results {from} - {to}
        </NumberResultsShown>
      );
    } else {
      return <NumberResultsShown>0 Results</NumberResultsShown>;
    }
  }

  render() {
    const {getPreviousPage, getNextPage, baseQuery} = this.props;

    return (
      <React.Fragment>
        <PaginationButtons className="btn-group">
          <Button
            className="btn"
            disabled={!baseQuery.previous}
            size="xsmall"
            icon="icon-chevron-left"
            onClick={getPreviousPage}
          />
          <Button
            className="btn"
            disabled={!baseQuery.next}
            size="xsmall"
            icon="icon-chevron-right"
            onClick={getNextPage}
          />
        </PaginationButtons>
        {this.getPageNumber()}
      </React.Fragment>
    );
  }
}

const PaginationButtons = styled(Flex)`
  justify-content: flex-end;
`;

export const NumberResultsShown = styled(Flex)`
  justify-content: flex-end;
  color: ${p => p.theme.gray6};
  font-size: ${p => p.theme.fontSizeSmall};
`;
