import { Component } from 'react';
import { serviceSearch } from 'helpers/pixabay-api';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { Wrapper, Error } from './App.styled';

export class App extends Component {
  state = {
    request: '',
    images: [],
    page: 1,
    error: '',
    currentItem: null,
    isLoading: false,
    isModalOpen: false,
    isLoadMore: false,
    isSearchDisabled: false,
  };

  componentDidUpdate(_, prevState) {
    const { page, request } = this.state;
    if (page !== prevState.page || request !== prevState.request) {
      this.setState({ isLoading: true, isSearchDisabled: true });
      serviceSearch(request, page)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            this.setState({
              error: 'Please try again.',
            });
            return;
          }
          this.setState(prev => ({
            images: [...prev.images, ...hits],
            isLoadMore: this.state.page < Math.ceil(totalHits / 12),
            error: '',
          }));
        })
        .catch(error =>
          this.setState({
            error: 'Please try again.',
          })
        )
        .finally(() =>
          this.setState({ isLoading: false, isSearchDisabled: false })
        );
    }
  }

  searchHandler = obj => {
    if (obj.searchrequest.trim() === '') {
      this.setState({
        error: 'Please, enter request',
      });
      return;
    }
    this.setState({
      request: obj.searchrequest,
      page: 1,
      images: [],
      isLoadMore: false,
      error: '',
    });
  };

  loadMoreHandler = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  openModalHandler = e => {
    const imageId = Number(e.target.id);
    const currentItem = this.state.images.find(({ id }) => id === imageId);
    this.setState({ currentItem: currentItem, isModalOpen: true });
  };

  closeModalHandler = () => {
    this.setState({ currentItem: null, isModalOpen: false });
  };

  render() {
    const {
      images,
      isModalOpen,
      isLoadMore,
      isLoading,
      isSearchDisabled,
      currentItem,
      error,
    } = this.state;

    return (
      <Wrapper>
        <Searchbar
          searchHandler={this.searchHandler}
          isSearchDisabled={isSearchDisabled}
        />
        {error === '' ? (
          <ImageGallery
            items={images}
            openModalHandler={this.openModalHandler}
          />
        ) : (
          <Error>{error}</Error>
        )}
        {isLoading && <Loader />}
        {isLoadMore && <Button onClick={this.loadMoreHandler} />}
        {isModalOpen && (
          <Modal item={currentItem} closeModal={this.closeModalHandler} />
        )}
      </Wrapper>
    );
  }
}
