import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <Topbar />
            <div className="flex flex-1 overflow-hidden ">
                {/* Sidebar */}
                <div className={`fixed md:relative z-40 bg-gradient-to-r from-blue-700 to-blue-500 h-full w-64 transition-transform  duration-300 ease-in-out  md:translate-x-0`} >
                    <Sidebar/>
                </div>
                {/* Main Content */}
                <div className="flex-1 flex flex-col h-full overflow-y-auto ml-0 md:ml-0"  >
                    <div className="flex-1">
                    {children}
                    </div>
                </div>
            </div>

        </div>
    );
}