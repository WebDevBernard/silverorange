import { FC } from 'react';
import { nanoid } from 'nanoid';
import { Repo } from '../store/interface';

const Repo: FC<{ repos: Repo[] }> = ({ repos }) => {
  return (
    <table className="flex">
      <thead>
        <tr>
          <th>Commit Date</th>
          <th>Author</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {repos.map((repo) => {
          return (
            <tr key={nanoid()}>
              <td>{repo.updated_at}</td>
              <td>{repo.owner.login}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Repo;
