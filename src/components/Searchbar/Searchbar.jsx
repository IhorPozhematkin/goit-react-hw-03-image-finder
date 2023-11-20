import { Formik } from 'formik';
import {
  SearchBar,
  SearchForm,
  SearchButton,
  ButtonLabel,
  SearchInput,
  ButtonImage,
} from './Searchbar.styled';

export const Searchbar = ({ searchHandler, isSearchDisabled }) => {
  return (
    <SearchBar>
      <Formik initialValues={{ searchrequest: '' }} onSubmit={searchHandler}>
        <SearchForm>
          <SearchButton type="submit" disabled={isSearchDisabled}>
            <ButtonImage />
            <ButtonLabel>Search</ButtonLabel>
          </SearchButton>

          <SearchInput
            name="searchrequest"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </SearchBar>
  );
};
