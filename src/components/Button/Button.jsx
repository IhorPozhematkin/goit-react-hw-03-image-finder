import { LoadMoreButton } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <LoadMoreButton type="button" aria-label="Load more" onClick={onClick}>
      Load more
    </LoadMoreButton>
  );
};
