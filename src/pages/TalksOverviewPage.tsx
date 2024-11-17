import TalkList from '../components/talks/TalkList';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const TalksOverviewPage = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('DataContext not found!');
  }

  const { isLoading, talks } = context;

  return (
    <>
      <h1>Talks</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TalkList talks={talks} />
      )}
    </>
  );
};

export default TalksOverviewPage;