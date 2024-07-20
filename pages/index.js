import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWords } from "../store/store";
import { Provider } from "react-redux";
import store from "../store/store";
import YouTube from "youtube-player";

const fetchWords = async () => {
  const res = await fetch("/api/words");
  return res.json();
};

const IndexPage = () => {
  const dispatch = useDispatch();
  const words = useSelector((state) => state.words);
  const [search, setSearch] = useState("");
  const [filteredWords, setFilteredWords] = useState(words);
  const [videoId, setVideoId] = useState("XFkzRNyygfk");
  const playerRef = useRef(null);

  useEffect(() => {
    const getWords = async () => {
      const wordsData = await fetchWords();
      dispatch(setWords(wordsData));
    };
    getWords();
  }, [dispatch]);

  useEffect(() => {
    setFilteredWords(
      words.filter((word) =>
        word.word.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, words]);

  useEffect(() => {
    if (playerRef.current) {
      const player = YouTube(playerRef.current, {
        videoId: videoId,
        width: "640",
        height: "360",
      });

      return () => {
        player.destroy();
      };
    }
  }, [videoId]);

  return (
    <div>
      <h1>Daftar Kata KBBI</h1>
      <input
        type="text"
        placeholder="Cari kata..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredWords.map((word) => (
          <li key={word.id}>
            <strong>{word.word}</strong>: {word.meaning}
          </li>
        ))}
      </ul>
      {/* YouTube Player */}
      <div ref={playerRef} style={{ width: "640px", height: "360px" }} />
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <IndexPage />
  </Provider>
);

export default App;
