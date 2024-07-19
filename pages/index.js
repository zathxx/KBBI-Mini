import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWords, setSearch } from "../store/store";
import { Provider } from "react-redux";
import store from "../store/store";

const fetchWords = async (search = "") => {
  try {
    const res = await fetch(`/api/words?search=${search}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Fetched Data:", data); // Debugging log
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
};

const IndexPage = () => {
  const dispatch = useDispatch();
  const { words, search } = useSelector((state) => state.words);
  const [searchTerm, setSearchTerm] = useState(search);

  useEffect(() => {
    const getWords = async () => {
      const wordsData = await fetchWords(searchTerm);
      dispatch(setWords(wordsData));
    };
    getWords();
  }, [searchTerm, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearch(searchTerm));
  };

  return (
    <div>
      <h1>Daftar Kata KBBI</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari kata..."
        />
        <button type="submit">Cari</button>
      </form>
      <ul>
        {Array.isArray(words) && words.length > 0 ? (
          words.map((word) => (
            <li key={word.id}>
              <strong>{word.word}</strong>: {word.meaning}
            </li>
          ))
        ) : (
          <li>Tidak ada kata yang ditemukan</li>
        )}
      </ul>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <IndexPage />
  </Provider>
);

export default App;
