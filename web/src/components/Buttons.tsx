import { FC } from 'react';
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
      className={props.className}
    >
      {props.children}
    </button>
  );
};

const RepoButtons: FC<{ repos: Repo[] }> = ({ repos }) => {
  // https://stackoverflow.com/questions/60888184/return-array-of-names-from-array-of-objects
  const mappableButtons = repos
    .map((i) => i.language)
    .filter((x, i, a) => a.indexOf(x) === i);
  return (
    <div className="flex">
      {mappableButtons.map((languageName) => {
        return <ButtonWrapper key={nanoid()}>{languageName}</ButtonWrapper>;
      })}
    </div>
  );
};

export default RepoButtons;
