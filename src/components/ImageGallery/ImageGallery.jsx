import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImagesList } from './ImageGallery.styled';

export const ImageGallery = ({ items, openModalHandler }) => {
  return (
    <ImagesList>
      {items.map(item => (
        <ImageGalleryItem
          item={item}
          key={item.id}
          onClick={openModalHandler}
        />
      ))}
    </ImagesList>
  );
};
