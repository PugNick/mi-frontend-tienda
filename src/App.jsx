import Routes from './Components/Routes';
import './App.css';
import useScreenSize from './hooks/UseScreenSize';
import ScrollToTopButton from './Components/ScrollToTop/ButtonTop';

function App() {
  const width = useScreenSize();

  return (
    <>
      <Routes />
      {width < 1300 && <ScrollToTopButton />}
    </>
  );
}

export default App
