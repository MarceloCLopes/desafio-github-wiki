import { useState } from "react";
import { api } from "./services/api";

function App() {
  const [currentRepository, setCurrentRepository] = useState("");
  const [repository, setRepository] = useState([]);

  const handleSearchRepository = async (event) => {
    event.preventDefault();
    const { data } = await api.get(`repos/${currentRepository}`);

    if (data.id) {
      const isExist = repository.find((repo) => repo.id === data.id);

      if (!isExist) {
        setRepository((prev) => [...prev, data]);
        setCurrentRepository("");
        return;
      }
      alert("Repositório já existe");
      setCurrentRepository("");
    }
  };

  const handleRemoveRepository = (id) => {
    setRepository((prev) => prev.filter((repo) => repo.id !== id));
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="container mx-auto w-full flex flex-col items-center gap-4">
        <img src="./github.png" alt="logo github" className="w-20 h-20 mt-2" />
        <div className="flex w-full justify-center gap-2 items-center">
          <input
            type="text"
            className="h-14 w-1/2 border border-solid border-zinc-50 rounded-3xl bg-transparent px-4 outline-none my-4"
            value={currentRepository}
            onChange={(event) => setCurrentRepository(event.target.value)}
          />

          <button
            onClick={handleSearchRepository}
            className="bg-zinc-50 hover:bg-zinc-50/40 rounded-3xl h-16 w-32 border border-solid border-zinc-50 text-black"
          >
            Buscar
          </button>
        </div>

        {repository.map((repo) => (
          <div key={repo.id} className="w-full">
            <div key={repo.id} className="w-4/5">
              <h3 className="text-3xl">{repo.name}</h3>
              <p className="text-base text-zinc-50/60 mb-5">{repo.full_name}</p>

              <div key={repo.id} className="flex flex-col gap-1 items-start">
                <a href={repo.html_url} target="_blank" className="">
                  Ver repositório
                </a>
                <button
                  onClick={() => handleRemoveRepository(repo.id)}
                  className="text-red-600"
                >
                  Remover
                </button>
              </div>
              <hr className="text-zinc-50/60 my-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
