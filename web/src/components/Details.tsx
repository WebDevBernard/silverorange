import { FC, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Commit } from '../store/interface';
import { ButtonWrapper } from './Buttons';
import Markdown from 'markdown-to-jsx';

const Repo: FC<{
  commitInfo: Commit | undefined;
  handleChange: (fullName: string, url: string) => void;
  repoName: string;
}> = ({ commitInfo, handleChange, repoName }) => {
  const [md, setMd] = useState('');
  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/${repoName}/master/README.md`)
      .then((res) => {
        if (res.ok) {
          return res.text();
        }
        throw new Error('No Readme file');
      })
      .then((text) => setMd(text))
      .catch((error) => {
        console.log(error);
      });
  }, [repoName]);
  return (
    <div className="flex flex-col items-center">
      <ButtonWrapper onClick={() => handleChange('', '')}>
        Go Back
      </ButtonWrapper>

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
      <article className="prose lg:prose-xl">
        <Markdown>{md}</Markdown>
      </article>
    </div>
  );
};

export default Repo;
