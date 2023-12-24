const ErrorMessage = ({ msg = "" }) => {
  return (
    <div className="text-center w-full px-2 py-1 bg-red-300 text-red-600 rounded-sm">
      {msg}
    </div>
  );
};

export default ErrorMessage;
