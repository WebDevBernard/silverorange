import { FC } from 'react';
import { nanoid } from 'nanoid';
import { IProps } from '../store/interface';

// repository name, description,
//     language, and forks count in the list.

const List: FC<{ repos: IProps[] }> = ({ repos }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Language</th>
          <th>Forks Count</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {repos.map((repo) => {
          return (
            <tr key={nanoid()}>
              <td>{repo.name}</td>
              <td>{repo.description}</td>
              <td>{repo.language}</td>
              <td>{repo.forks_count}</td>
              <td>{repo.created_at}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default List;
