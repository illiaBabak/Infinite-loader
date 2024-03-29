export const Alert = ({ setIsError }: { setIsError: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element => (
  <div className='alert' onAnimationEnd={() => setIsError(false)}>
    <img src='https://www.freeiconspng.com/thumbs/error-icon/error-icon-4.png' />
    <h2>Error</h2>
  </div>
);
