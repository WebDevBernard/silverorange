import useFetchRepos from './hooks/useFetchRepos';
import Buttons from './components/Buttons';
import Table from './components/Table';
import Readme from './components/Readme';
export function App() {
  const { repos } = useFetchRepos();
  console.log(repos);

  return (
    <div className="flex flex-col items-center">
      <Buttons />
      <Table repos={repos} />
      <Readme />
    </div>
  );
}
