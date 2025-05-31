"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { FaChevronDown } from "react-icons/fa";

const Sidebar = () => {
    const [dropdown, setDropdown] = useState(""); // To handle dropdown visibility

    const toggleDropdown = (menu) => setDropdown(dropdown === menu ? "" : menu);

    return (
        <div className="flex flex-col bg-gray-900 text-white h-full overflow-y-auto pb-5">
            {/* Sidebar Links */}
            <ul className="mx-2 mt-2 space-y-2">
                {/* Dashboard */}
                <li>
                    <Link
                        href="/dashboard"
                        className="cursor-pointer w-full  px-4 py-2 text-left bg-indigo-500 text-white hover:bg-indigo-600 rounded flex items-center justify-between shadow"
                    >
                        Dashboard
                    </Link>
                </li>


                {/* Expenses Dropdown */}
                <li>
                    <button
                        onClick={() => toggleDropdown("quotation")}
                        className="w-full px-4 py-2 text-left bg-indigo-500 text-white hover:bg-indigo-600 rounded flex items-center justify-between shadow"
                    >
                        Quotation  <FaChevronDown className={`transform transition-transform duration-200 ${dropdown === "quotation" ? "rotate-180" : ""}`} />
                    </button>
                    {dropdown === "quotation" && (
                        <ul className="ml-4 my-2">
                            <li>
                                <Link
                                    href="/dashboard/add-quotation"
                                    className="cursor-pointer mb-2 block px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-600 rounded"
                                >
                                    Add Quotation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/all-quotation"
                                    className="cursor-pointer mb-2 block px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-600 rounded"
                                >
                                    Quotation List
                                </Link>
                            </li>
                        </ul>
                    )}

                </li>
            </ul>
        </div>
    )
}

export default Sidebar