import Link from "next/link";

export default function Footer() {
  const CurrentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <p className="text-center mt-8 text-sm/6 text-gray-600 md:order-1 md:mt-0">
          &copy; {CurrentYear} <Link href="https://github.com/jhl-hk">JHL-HK</Link>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
