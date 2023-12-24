const SuccessMessage = ({ message = "" }) => {
  return (
    <div className="text-center w-full px-2 py-1 bg-green-300 text-green-600 rounded-sm">
      {message}
    </div>
  );
};

export default SuccessMessage;
