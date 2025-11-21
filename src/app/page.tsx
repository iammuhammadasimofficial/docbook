import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Stethoscope, Calendar } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            Find Your Doctor & Book Online
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg opacity-90 md:text-xl">
            Book appointments with the best doctors in your city. Online
            consultations and in-clinic visits available.
          </p>

          {/* Search Bar */}
          <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-lg bg-white p-4 shadow-xl md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-3 left-3 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Doctor name or specialty"
                className="h-12 pl-10 text-slate-900"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute top-3 left-3 h-5 w-5 text-slate-400" />
              <Input
                placeholder="City (e.g. Lahore, Karachi)"
                className="h-12 pl-10 text-slate-900"
              />
            </div>
            <Button
              size="lg"
              className="h-12 bg-blue-600 px-8 text-lg font-semibold hover:bg-blue-700"
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            Why Choose DocBook?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Find Best Doctors</h3>
              <p className="text-slate-600">
                Search by specialty, city, or name to find the perfect doctor
                for your needs.
              </p>
            </div>
            <div className="rounded-xl bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Instant Booking</h3>
              <p className="text-slate-600">
                Book appointments instantly. Choose between online video
                consultations or in-clinic visits.
              </p>
            </div>
            <div className="rounded-xl bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Stethoscope className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Verified Profiles</h3>
              <p className="text-slate-600">
                All doctors are verified and reviewed by patients to ensure
                quality care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors (Placeholder) */}
      <section className="bg-slate-100 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-900">
              Top Rated Doctors
            </h2>
            <Link
              href="/doctors"
              className="font-semibold text-blue-600 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="h-48 w-full animate-pulse bg-slate-200" />{" "}
                {/* Placeholder for Image */}
                <div className="p-6">
                  <div className="mb-2 text-xs font-bold tracking-wide text-blue-600 uppercase">
                    Cardiologist
                  </div>
                  <h3 className="mb-1 text-lg font-bold">
                    Dr. Name Placeholder
                  </h3>
                  <p className="mb-4 text-sm text-slate-500">
                    MBBS, FCPS • 10 Years Exp
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">$20</span>
                    <Link href={`/book/doctor-${i}`}>
                      <Button size="sm" variant="outline">
                        Book Now
                      </Button>
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
