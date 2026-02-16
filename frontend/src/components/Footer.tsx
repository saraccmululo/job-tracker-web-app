const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-gray-300 text-center py-3 text-sm">
      &copy;{year} Developed by SCCM Software Solutions
    </footer>
  );
};

export default Footer;
