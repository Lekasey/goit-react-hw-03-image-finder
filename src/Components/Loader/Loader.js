import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Spinner = () => {
  return (
    <Loader
      className="Loader"
      type="Puff"
      color="#00BFFF"
      height={60}
      width={60}
    />
  );
};

export default Spinner;
