import useFetchRepos from './hooks/useFetchRepos';
import RepoButtons from './components/Buttons';
import List from './components/List';
import Repo from './components/Repo';
export function App() {
  const { repos } = useFetchRepos();
  console.log(repos);

  return (
    <div className="flex flex-col items-center">
      <RepoButtons repos={repos} />
      <List repos={repos} />
      <Repo />
    </div>
  );
}
