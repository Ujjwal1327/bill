import { GiHamburgerMenu } from "react-icons/gi";


const Topbar = () => {
    return (
        <header className="bg-gray-800 text-white p-1 sm:p-4 flex items-center justify-between gap-1 md:gap-4 shadow-lg">
            <h1 className="text-2xl font-semibold hidden md:block">NextGen Bill</h1>
            <GiHamburgerMenu className="md:hidden flex items-center gap-3 p-2 hover:bg-white rounded-full text-5xl transition duration-300" />
            {/* Search Bar */}
            <div className="relative flex items-center bg-white text-gray-700 rounded-full px-3 py-1 min-w-[50%] flex-grow md:flex-grow-0 border border-gray-300 shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition">
                <input
                    type="text"
                    className="w-full border-none outline-none text-gray-700 placeholder-gray-500 rounded-full py-1 px-3"
                    placeholder="Search names"
                />
            </div>
            <button className="text-white bg-blue-500 rounded-sm p-2"> Logout</button>
        </header>
    )
}

export default Topbar