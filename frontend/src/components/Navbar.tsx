const Navbar = () => {
  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💼</span>
          <h1 className="text-xl font-bold">Job Application Tracker</h1>
        </div>

        <nav>
          {/* Future nav buttons: */}
          {/* <button className="bg-white text-blue-800 px-3 py-1 rounded hover:bg-gray-100">
            Add Application
          </button> */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
