import { Comments, PostContent, PostForm } from './components';
import { useParams, useMatch } from 'react-router';
import { Error, PrivateContent } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { selectPost } from '../../selectors';
import { ROLE } from '../../constants';

const PostContainer = ({ className }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const isEditing = !!useMatch('/post/:id/edit');
  const isCreating = !!useMatch('/post');
  const [isLoading, setIsLoading] = useState(true);
  const post = useSelector(selectPost);

  useLayoutEffect(() => {
    dispatch(RESET_POST_DATA);
  }, [dispatch, isCreating]);

  useEffect(() => {
    if (isCreating) {
      setIsLoading(false);
      return;
    }
    dispatch(loadPostAsync(params.id)).then((postData) => {
      setError(postData.error);
      setIsLoading(false);
    });
  }, [dispatch, params.id, isCreating]);

  if (isLoading) {
    return null;
  }

  const SpecificPostPage =
    isCreating || isEditing ? (
      <PrivateContent access={[ROLE.ADMIN]} serverError={error}>
        <div className={className}>
          <PostForm post={post} />
        </div>
      </PrivateContent>
    ) : (
      <div className={className}>
        <PostContent post={post} />
        <Comments comments={post.comments} postId={post.id} />
      </div>
    );

  return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
  margin: 40px 0;
  padding: 0 80px;
`;
