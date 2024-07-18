import { useDispatch, useSelector } from 'react-redux';
import { useId } from 'react';

import { selectNameFilter } from '../../redux/filters/selectors';
import { changeFilter } from '../../redux/filters/slice';

import css from './SearchBox.module.scss';

const SearchBox = () => {
  const searchId = useId();
  const dispatch = useDispatch();
  const filters = useSelector(selectNameFilter);

  const handleSearch = event => dispatch(changeFilter(event));

  return (
    <div className={css.search}>
      <label className={css.label} htmlFor="searchId">
        Find contacts by name
      </label>
      <input
        className={css.input}
        type="text"
        name="text"
        value={filters}
        id={searchId}
        onChange={e => handleSearch(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBox;
