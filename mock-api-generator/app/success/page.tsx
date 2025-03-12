import Link from "next/link";

export default function Success() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Subscription Successful!</h1>
        <p className="text-lg mb-4">Thank you for subscribing. You can now generate and manage your APIs.</p>
        <Link href="/dashboard">
          <a className="bg-blue-500 text-white px-6 py-2 rounded-lg">Go to Dashboard</a>
        </Link>
      </div>
    </div>
  );
}
