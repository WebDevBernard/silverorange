import useFetchRepos from './hooks/useFetchRepos';
import RepoButtons from './components/Buttons';
import List from './components/List';

export function App() {
  const { repos, handleChange, commitInfo } = useFetchRepos();

  return (
    <div className="flex flex-col items-center">
      <RepoButtons repos={repos} />
      <List repos={repos} handleChange={handleChange} commitInfo={commitInfo} />
    </div>
  );
}
