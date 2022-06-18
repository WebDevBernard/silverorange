import { FC, useEffect, useState } from 'react';
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
      .catch((error: Error) => {
        console.log(error);
      });
  }, [repoName]);
  return (
    <div className="m-12 space-y-12">
      <ButtonWrapper className="" onClick={() => handleChange('', '')}>
        Go Back
      </ButtonWrapper>
      <table className="text-left border-black border-[1px] w-full border-separate rounded-md p-4">
        <tr>
          <th>Commit Date</th>
          <td>
            {new Date(
              commitInfo?.commit.author.date || new Date()
            ).toLocaleDateString('en-US')}
          </td>
        </tr>
        <tr>
          <th>Author</th>
          <td>{commitInfo?.commit.author.name}</td>
        </tr>{' '}
        <tr>
          <th>Message</th>
          <td>{commitInfo?.commit.message}</td>
        </tr>
      </table>
      <article className="prose prose-sm">
        <Markdown>{md}</Markdown>
      </article>
    </div>
  );
};

export default Repo;
