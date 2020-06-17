import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    api.post('/repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: "http://urlnovorepositorio.com",
      techs: ["tech-01", "tech-02", "tech-03"]
    }).then(response => {
      const repository = response.data;
      setRepositories([...repositories, repository]);
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      if (response.status === 204) {
        var repositoryIndex = repositories.findIndex(repository => repository.id === id);
        if (repositoryIndex >= 0) {
          console.log(id)
          repositories.splice(repositoryIndex, 1);
          setRepositories(repositories.filter(repository => repository.id != id));
        }
      }
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
