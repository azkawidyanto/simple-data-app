import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CatData from '../Component/CatData';
import { storeCats } from '../Redux/reducer';

const BASE_URL = 'https://api.api-ninjas.com/v1/cats';

const SearchPage = () => {
  const [searchMinLife, setSearchMinLife] = useState('');
  const [filter, setFilter] = useState('');

  const dataCats = useSelector(state => state?.cats?.cats);
  const dispatch = useDispatch();
  const [showData, setShowData] = useState(false);
  const listData = async minLife => {
    const response = await fetch(
      `${BASE_URL}?
        &min_life_expectancy=${minLife}`,
      {
        headers: { 'X-Api-Key': 'jdGmER1XUjP2GcJT/qQaIA==otdAHgKZRXqxe5y4' },
      }
    ).then(res => res.json());

    return response;
  };

  const catArray = Object.keys(dataCats).map(index => {
    let cat = dataCats[index];
    return cat;
  });

  const handleSubmitMinLife = e => {
    e.preventDefault();

    const query = e.target?.[0].value;
    listData(query).then(data => dispatch(storeCats(data)));
  };

  const handleSubmitFilter = e => {
    e.preventDefault();
    const query = e.target?.[0].value;
    if (query) {
      return dispatch(storeCats(catArray.filter(element => element.name === query)));
    }
  };

  useEffect(() => {
    listData(searchMinLife).then(data => dispatch(storeCats(data)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!filter) {
      listData(searchMinLife).then(data => dispatch(storeCats(data)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filter]);

  useEffect(() => {
    if (Object.values(dataCats)?.length > 0) {
      setShowData(true);
    }
  }, [dataCats]);

  return (
    <div className='app'>
      <div className="input-container">
        <form data-testid="custom-element" onSubmit={e => handleSubmitMinLife(e)}>
          <label for="minLife">Minimal Life</label>
          <input
            id="minLife"
            style={{ marginRight: '1vw' }}
            type="text"
            value={searchMinLife}
            placeholder="minimal life"
            onChange={e => setSearchMinLife(e.target.value)}
          />

          <button variant="solid">Search</button>
        </form>

        <form data-testid="custom-element" onSubmit={e => handleSubmitFilter(e)}>
          <label for="minLife">Filter</label>
          <input
            id="minLife"
            style={{ marginRight: '1vw' }}
            type="text"
            value={filter}
            placeholder="name"
            onChange={e => setFilter(e.target.value)}
          />

          <button variant="solid">Filter</button>
        </form>
      </div>

      <div className="container">
        {showData &&
          catArray.map((cat, index) => (
            <CatData
              key={index}
              name={cat?.name}
              image_link={cat?.image_link}
              origin={cat?.origin}
              length={cat?.length}
              maxLife={cat?.max_life_expectancy}
              minLife={cat?.min_life_expectancy}
              minWeight={cat?.min_weight}
              maxWeight={cat?.max_weight}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
