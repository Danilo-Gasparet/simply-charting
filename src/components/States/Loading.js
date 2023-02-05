const Loading = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className=" flex-item h-24 w-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin rounded-full"></div>
        <h1 className=" mt-4 flex-item text-center text-2xl font-bold">Loading...</h1>
      </div>
    </div>
  );
};

export default Loading;
