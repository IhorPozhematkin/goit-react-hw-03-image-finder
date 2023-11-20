import { Watch } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Watch
      height="40"
      width="40"
      radius="48"
      color="black"
      ariaLabel="watch-loading"
      wrapperStyle={{ margin: '0 auto' }}
      wrapperClassName=""
      visible={true}
    />
  );
};
