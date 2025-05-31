import Link from "next/link";

export default function Home() {
  return (
    <div className="text-blue-400 flex flex-col items-center justify-center min-h-[100vh]">
    <Link href="/dashboard" className="bg-yellow-500 p-2 rounded-sm text-black cursor-pointer">
        go to dashboard
    </Link>
      <h1 className="text-4xl">This is login page..</h1>
    </div>
  );
}
