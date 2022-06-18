import { useState, useEffect } from 'react';
import useFetchRepos from './hooks/useFetchRepos';
import RepoButtons from './components/Buttons';
import { Repo } from './store/interface';
import List from './components/List';

export function App() {
  const { repos, handleChange, commitInfo } = useFetchRepos();
  // https://www.freecodecamp.org/news/how-to-make-a-filter-component-in-react/
  // filters based on language type
  const [item, setItem] = useState<Repo[]>(repos);

  // load repos on initial page load
  useEffect(() => {
    setItem(repos);
  }, [repos]);

  // click to filter repos based on language
  const filterRepos = (language: string) => {
    const newItem = repos.filter((category) => {
      return category.language === language;
    });
    setItem(newItem);
  };

  return (
    <div className="flex flex-col items-center">
      <RepoButtons filterRepos={filterRepos} repos={repos} setItem={setItem} />
      <List repos={item} handleChange={handleChange} commitInfo={commitInfo} />
    </div>
  );
}
