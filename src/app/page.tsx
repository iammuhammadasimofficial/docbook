import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Stethoscope, Calendar } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Doctor & Book Online
          </h1>
          <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Book appointments with the best doctors in your city. Online consultations and in-clinic visits available.
          </p>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-lg shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Doctor name or specialty"
                className="pl-10 h-12 text-slate-900"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input
                placeholder="City (e.g. Lahore, Karachi)"
                className="pl-10 h-12 text-slate-900"
              />
            </div>
            <Button size="lg" className="h-12 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-700">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Why Choose DocBook?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Find Best Doctors</h3>
              <p className="text-slate-600">Search by specialty, city, or name to find the perfect doctor for your needs.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Booking</h3>
              <p className="text-slate-600">Book appointments instantly. Choose between online video consultations or in-clinic visits.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Stethoscope className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Profiles</h3>
              <p className="text-slate-600">All doctors are verified and reviewed by patients to ensure quality care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors (Placeholder) */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Top Rated Doctors</h2>
            <Link href="/doctors" className="text-blue-600 font-semibold hover:underline">View All</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-slate-200 w-full animate-pulse" /> {/* Placeholder for Image */}
                <div className="p-6">
                  <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Cardiologist</div>
                  <h3 className="text-lg font-bold mb-1">Dr. Name Placeholder</h3>
                  <p className="text-slate-500 text-sm mb-4">MBBS, FCPS • 10 Years Exp</p>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-900 font-bold">$20</span>
                    <Link href={`/book/doctor-${i}`}>
                      <Button size="sm" variant="outline">Book Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
