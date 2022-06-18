import { FC } from 'react';
import { nanoid } from 'nanoid';
import { Commit } from '../store/interface';
import { ButtonWrapper } from './Buttons';

const Repo: FC<{
  commitInfo: Commit | undefined;
  handleChange: (url: string) => void;
}> = ({ commitInfo, handleChange }) => {
  return (
    <div className="flex flex-col items-center">
      <ButtonWrapper onClick={() => handleChange('')}>Go Back</ButtonWrapper>
      <table>
        <thead>
          <tr>
            <th>Commit Date</th>
            <th>Author</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr key={nanoid()}>
            <td>{commitInfo?.commit.author.date}</td>
            <td>{commitInfo?.commit.author.name}</td>
            <td>{commitInfo?.commit.message}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Repo;
