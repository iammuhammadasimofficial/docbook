import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-white text-lg font-bold mb-4">DocBook</h3>
                    <p className="text-sm">
                        Your trusted platform for booking doctor appointments online and in-clinic.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">For Patients</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/doctors" className="hover:text-white">Find a Doctor</Link></li>
                        <li><Link href="/auth/login" className="hover:text-white">Login</Link></li>
                        <li><Link href="/auth/login?mode=signup" className="hover:text-white">Register</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">For Doctors</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/doctor/onboarding" className="hover:text-white">Join as a Doctor</Link></li>
                        <li><Link href="/doctor/dashboard" className="hover:text-white">Doctor Dashboard</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Contact</h4>
                    <ul className="space-y-2 text-sm">
                        <li>support@docbook.com</li>
                        <li>+92 300 1234567</li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-sm">
                © {new Date().getFullYear()} DocBook. All rights reserved.
            </div>
        </footer>
    );
}
