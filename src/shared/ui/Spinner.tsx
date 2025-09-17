import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex justify-center py-4">
      <ClipLoader color="#0064FF" size={30} />
    </div>
  );
};

export default Spinner;
