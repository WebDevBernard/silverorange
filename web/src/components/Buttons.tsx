import React, { FC } from 'react';
import { Repo } from '../store/interface';
import { nanoid } from 'nanoid';

interface ButtonProps {
  type?: 'submit';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: any;
}

export const ButtonWrapper: FC<ButtonProps> = (props) => {
  return (
    <button
      type={'submit'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${props.className} bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mx-2`}
    >
      {props.children}
    </button>
  );
};

const RepoButtons: FC<{
  repos: Repo[];
  filterRepos: (value: string) => void;
  setButtons: (value: Repo[]) => void;
}> = ({ repos, filterRepos, setButtons }) => {
  // https://stackoverflow.com/questions/60888184/return-array-of-names-from-array-of-objects
  const mappableButtons = repos
    .map((i) => i.language)
    .filter((x, i, a) => a.indexOf(x) === i);
  return (
    <div>
      {mappableButtons.map((languageName) => {
        return (
          <ButtonWrapper
            onClick={() => filterRepos(languageName)}
            key={nanoid()}
          >
            {languageName}
          </ButtonWrapper>
        );
      })}
      <ButtonWrapper onClick={() => setButtons(repos)}>Show All</ButtonWrapper>
    </div>
  );
};

export default RepoButtons;
