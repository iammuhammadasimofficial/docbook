import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 py-12 text-slate-300">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-bold text-white">DocBook</h3>
          <p className="text-sm">
            Your trusted platform for booking doctor appointments online and
            in-clinic.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-white">For Patients</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/doctors" className="hover:text-white">
                Find a Doctor
              </Link>
            </li>
            <li>
              <Link href="/auth/login" className="hover:text-white">
                Login
              </Link>
            </li>
            <li>
              <Link href="/auth/login?mode=signup" className="hover:text-white">
                Register
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-white">For Doctors</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/doctor/onboarding" className="hover:text-white">
                Join as a Doctor
              </Link>
            </li>
            <li>
              <Link href="/doctor/dashboard" className="hover:text-white">
                Doctor Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-white">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>support@docbook.com</li>
            <li>+92 300 1234567</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t border-slate-800 px-4 pt-8 text-center text-sm">
        © {new Date().getFullYear()} DocBook. All rights reserved.
      </div>
    </footer>
  );
}
