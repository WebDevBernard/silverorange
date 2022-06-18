import { useState, useEffect } from 'react';
import useFetchRepos from './hooks/useFetchRepos';
import RepoButtons from './components/Buttons';
import { Repo } from './store/interface';
import List from './components/List';
import Details from './components/Details';
import Loading from './components/Loading';

export function App() {
  const { repos, handleChange, selected, commitInfo, repoName } =
    useFetchRepos();
  // https://www.freecodecamp.org/news/how-to-make-a-filter-component-in-react/
  // filters based on language type
  const [sortByLanguages, setSortByLanguages] = useState<Repo[]>(repos);

  // load repos on initial page load
  useEffect(() => {
    setSortByLanguages(repos);
  }, [repos]);

  // click to filter repos based on language
  const filterRepos = (language: string) => {
    const selectedLanguage = repos.filter((category) => {
      return category.language === language;
    });
    setSortByLanguages(selectedLanguage);
  };

  // https://stackoverflow.com/questions/62517789/how-to-render-a-component-on-click-on-list-item-to-show-its-detail

  if (selected) {
    return (
      <Details
        commitInfo={commitInfo}
        handleChange={handleChange}
        repoName={repoName}
      />
    );
  }

  return (
    <div className="m-12 space-y-12">
      <RepoButtons
        filterRepos={filterRepos}
        repos={repos}
        setButtons={setSortByLanguages}
      />
      {!repos && Loading}
      <List repos={sortByLanguages} handleChange={handleChange} />
    </div>
  );
}
