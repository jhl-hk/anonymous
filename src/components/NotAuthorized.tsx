import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function NotAuthorized() {
  return (
    <div className="h-screen">
      <Header />
      <main className="grid min-h-full place-items-center bg-white px-6 py-10 sm:py-16 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">401</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Not Authorized
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Sorry, you are not authorized to visit this page.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <button
              className="text-sm font-semibold text-gray-900"
            >
              Sign In <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
