import styled from 'styled-components';
import { Button } from '../../../../components';
import PropTypes from 'prop-types';

const PaginationContainer = ({ className, setPage, page, lastPage }) => {
  return (
    <div className={className}>
      <Button disabled={page === 1} onClick={() => setPage(1)}>
        В начало
      </Button>
      <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Предыдущая
      </Button>
      <div className="current-page">Страница:{page}</div>
      <Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
        Следующая
      </Button>
      <Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
        В конец
      </Button>
    </div>
  );
};

export const Pagination = styled(PaginationContainer)`
  display: flex;
  justify-content: center;
  margin: 0 0 20px;
  padding: 0 35px;
  width: 100%;
  bottom: 140px;
  position: absolute;

  & button {
    margin: 0 5px;
  }

  & .current-page {
    border: 1px solid black;
    text-align: center;
    font-size: 18px;
    margin: 0px 5px;
    font-weight: 500;
    width: 100%;
    line-height: 26px;
    height: 32px;
  }
`;

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
