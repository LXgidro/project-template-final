import styled from 'styled-components';
import { Icon } from '../../../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeCommentAsync,
  openModal,
  CLOSE_MODAL,
} from '../../../../../../actions';
import { ROLE } from '../../../../../../constants';
import { selectUserRole } from '../../../../../../selectors';
import PropTypes from 'prop-types';

const CommentContainer = ({
  className,
  postId,
  id,
  author,
  content,
  publishedAt,
}) => {
  const dispatch = useDispatch();
  const userRole = useSelector(selectUserRole);

  const onCommentRemove = (id) => {
    dispatch(
      openModal({
        text: ' Удалить комментарий?',
        onConfirm: () => {
          dispatch(removeCommentAsync(postId, id));
          dispatch(CLOSE_MODAL);
        },

        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  const isAdminOrModeator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

  return (
    <div className={className}>
      <div className="comment">
        <div className="info-panel">
          <div className="author">
            <Icon
              inactive="true"
              id="fa-user-circle-o"
              margin="0 10px 0 0"
              size="18px"
              onClick={() => {}}
            />
            {author}
          </div>
          <div className="published-at">
            <Icon
              inactive="true"
              id="fa-calendar-o"
              margin="0 7px 0 0"
              size="18px"
              onClick={() => {}}
            />
            {publishedAt}
          </div>
        </div>
        <div className="comment-text">{content}</div>
      </div>
      {isAdminOrModeator && (
        <Icon
          id="fa-trash-o"
          margin="0 0 0 10px"
          size="22px"
          onClick={() => onCommentRemove(id)}
        />
      )}
    </div>
  );
};
export const Comment = styled(CommentContainer)`
  display: flex;
  margin-top: 10px;
  & .comment {
    border: 1px solid black;
    width: 550px;
    padding: 5px 10px;
  }
  & .info-panel {
    display: flex;
    justify-content: space-between;
  }
  & .author {
    display: flex;
  }
  & .published-at {
    display: flex;
  }
`;

Comment.propTypes = {
  postId: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
};
