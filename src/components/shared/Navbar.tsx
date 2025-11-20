"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User as UserIcon } from "lucide-react";
import { auth } from "@/lib/firebase";

export function Navbar() {
    const { user, loading } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                        D
                    </div>
                    <span className="text-xl font-bold text-slate-900">DocBook</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                    <Link href="/doctors" className="hover:text-blue-600 transition-colors">
                        Find Doctors
                    </Link>
                    <Link href="/about" className="hover:text-blue-600 transition-colors">
                        About Us
                    </Link>
                    <Link href="/contact" className="hover:text-blue-600 transition-colors">
                        Contact
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    {loading ? (
                        <div className="h-9 w-20 bg-slate-100 animate-pulse rounded-md" />
                    ) : user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <UserIcon className="h-4 w-4" />
                                    Dashboard
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => auth?.signOut()}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/auth/login">
                                <Button variant="ghost" size="sm">
                                    Log In
                                </Button>
                            </Link>
                            <Link href="/auth/login?mode=signup">
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
