import useFetchRepos from './hooks/useFetchRepos';
export function App() {
  const { repos } = useFetchRepos();
  console.log(repos);

  return <h1 className="text-3xsl font-bold underline">Test</h1>;
}
