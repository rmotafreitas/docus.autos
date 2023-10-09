export function Navbar() {
  return (
    <nav className="flex px-8 my-4 justify-between items-center">
      <h1 className="bg-clip-text text-transparent font-bold text-2xl bg-gradient-to-r from-[#5350F6] to-[#E662FE]">
        Docus
      </h1>
      <ul className="flex gap-8 items-center">
        <li className="text-lg font-semibold">About</li>
        <li className="text-lg font-semibold">Features</li>
        <li className="text-lg font-semibold">
          <button className="bg-[#4F4CE5] px-4 py-1 rounded-lg">Login</button>
        </li>
      </ul>
    </nav>
  );
}
