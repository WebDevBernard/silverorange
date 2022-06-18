import { FC, useState } from 'react';
import { nanoid } from 'nanoid';
import { Repo, Commit } from '../store/interface';

// repository name, description,
//     language, and forks count in the list.

const List: FC<{
  repos: Repo[];
  handleChange: (fullName: string, url: string) => void;
}> = ({ repos, handleChange }) => {
  return (
    <>
      <table className="w-full text-left">
        <thead className="border-b bg-gray-800 ">
          <tr>
            <th className="text-sm font-medium text-white px-6 py-4">Name</th>
            <th className="text-sm font-medium text-white px-6 py-4">
              Description
            </th>
            <th className="text-sm font-medium text-white px-6 py-4">
              Language
            </th>
            <th className="text-sm font-medium text-white px-6 py-4">
              Forks Count
            </th>
            <th className="text-sm font-medium text-white px-6 py-4">
              Created At
            </th>
          </tr>
        </thead>
        <tbody className="space-y-12 cursor-pointer">
          {repos.map((repo) => {
            return (
              <tr
                key={nanoid()}
                onClick={() => handleChange(repo.full_name, repo.url)}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4">{repo.name}</td>
                <td className="px-6 py-4">{repo.description}</td>
                <td className="px-6 py-4">{repo.language}</td>
                <td className="px-6 py-4">{repo.forks_count}</td>
                <td className="px-6 py-4">
                  {new Date(repo.created_at).toLocaleDateString('en-US')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default List;
