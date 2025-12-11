import { useState } from 'react';
import { Icon } from '../../../../components';
import styled from 'styled-components';
import { Comment } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { addCommentAsync } from '../../../../actions';
import { PROP_TYPE, ROLE } from '../../../../constants';
import PropTypes from 'prop-types';

const CommentsContainer = ({ className, comments = [], postId }) => {
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();
  const userRole = useSelector(selectUserRole);

  const onNewCommentAdd = (postId, content) => {
    dispatch(addCommentAsync(postId, content));
    setNewComment('');
  };

  const isGuest = userRole === ROLE.GUEST;

  return (
    <div className={className}>
      {!isGuest && (
        <div className="new-comment">
          <textarea
            name="comment"
            value={newComment}
            placeholder="Комментарий..."
            onChange={({ target }) => setNewComment(target.value)}
          ></textarea>
          <Icon
            id="fa-paper-plane-o"
            margin="0 0 0 10px"
            size="18px"
            onClick={() => onNewCommentAdd(postId, newComment)}
          />
        </div>
      )}
      <div className="comments">
        {comments.map(({ id, author, content, publishedAt }) => (
          <Comment
            key={id}
            postId={postId}
            id={id}
            author={author}
            content={content}
            publishedAt={publishedAt}
          />
        ))}
      </div>
    </div>
  );
};

export const Comments = styled(CommentsContainer)`
  width: 580px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;

  & .new-comment {
    display: flex;
    width: 100%;
    margin: 20px 0 0;
  }

  & .new-comment textarea {
    height: 120px;
    width: 550px;
    resize: none;
    font-size: 18px;
  }
`;

Comments.propTypes = {
  comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
  postId: PropTypes.string.isRequired,
};
