import React from "react";
import "./LandingPage.css" ;

const LandingPage = () => {
    const features = [
        {
            title: "Smart Booking",
            icon: "⏱️",
            content:
                "Intuitive scheduling with real-time availability and instant confirmation.",
        },
        {
            title: "Verified Doctors",
            icon: "👨⚕️",
            content:
                "All healthcare professionals are rigorously vetted and certified.",
        },
        {
            title: "Secure Platform",
            icon: "🔒",
            content:
                "State-of-the-art encryption protects your personal health data.",
        },
    ];

    const how_it_work = [
        {
            step: "1",
            title: "Create Profile",
            content: "Easy registration with secure verification.",
        },
        {
            step: "2",
            title: "Book Appointment",
            content: "Select from available slots with your preferred doctor.",
        },
        {
            step: "3",
            title: "Consult",
            content: "In-person consultation.",
        },
    ];

    const stats = [
        { number: "5K+", label: "Patients Served" },
        { number: "500+", label: "Medical Professionals" },
        { number: "24/7", label: "Support Available" },
        { number: "98%", label: "Satisfaction Rate" },
    ];

    return (
        <div className="bg-gray-950 text-white font-sans antialiased">
            {/* Hero Section */}
            <section
                id="home"
                className="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-950 to-emerald-950/50 overflow-visible hero"
            >
                <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-multiply" />
                <div className="relative z-10 text-center px-4 max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-snug">
                        <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-transparent bg-clip-text">
                            Connecting You to
                        </span>
                        <br />
                        <span className="text-gray-100">
                            Quality Healthcare
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto leading-normal">
                        Experience seamless medical appointments with CureLink.
                        Book your visit in advance, connect with certified
                        professionals, and take control of your healthcare
                        journey.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <a
                            href="#features"
                            className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/30 text-sm"
                        >
                            Get Started
                        </a>
                        <a
                            href="#how-it-works"
                            className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 font-bold py-3 px-8 rounded-full transition-colors duration-300 text-sm"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className="py-16 bg-gradient-to-b from-gray-800 to-gray-900"
            >
                <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-12 tracking-tight">
                        <span className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-transparent bg-clip-text">
                            Why Choose ClinicConnect
                        </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/50 p-8 rounded-2xl border border-emerald-500/10 hover:border-emerald-500/30 transition-transform duration-300 hover:-translate-y-2 shadow-lg"
                            >
                                <div className="text-4xl mb-4 text-emerald-500">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-emerald-500 mb-3 tracking-wide">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {feature.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-16 bg-gray-950">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-3 tracking-tight">
                            Simple Steps to Better Health
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto text-sm">
                            Three straightforward steps to connect with your
                            healthcare provider.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        <div className="absolute inset-0 flex items-center justify-center md:block">
                            <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-gray-800 absolute top-1/2 -translate-y-1/2" />
                        </div>
                        {how_it_work.map((step, index) => (
                            <div
                                key={index}
                                className="relative z-10 bg-gray-800 p-8 rounded-2xl shadow-lg transition-transform duration-300 hover:shadow-xl"
                            >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                                    {step.step}
                                </div>
                                <h3 className="text-2xl font-bold text-center mt-6 mb-2 text-emerald-500 tracking-wide">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 text-center text-sm">
                                    {step.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="about" className="py-16 bg-gray-800">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="p-6 border border-emerald-500/10 rounded-2xl transition-transform duration-300 hover:scale-105"
                            >
                                <div className="text-3xl font-bold text-emerald-500 mb-1">
                                    {stat.number}
                                </div>
                                <div className="text-gray-400 text-xs uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-950 border-t border-gray-800">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <h3 className="text-2xl font-bold text-emerald-500 mb-2">
                                CureLink
                            </h3>
                            <p className="text-gray-400 text-xs">
                                Empowering patients with connected, modern
                                healthcare solutions.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-gray-300 font-semibold mb-2 text-xs">
                                Quick Links
                            </h4>
                            <ul className="space-y-2">
                                {["About Us", "Careers", "Blog", "Press"].map(
                                    (link, index) => (
                                        <li key={index}>
                                            <a
                                                href="#"
                                                className="text-gray-400 hover:text-emerald-500 transition-colors duration-300 text-xs"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-gray-300 font-semibold mb-2 text-xs">
                                Legal
                            </h4>
                            <ul className="space-y-2">
                                {[
                                    "Privacy Policy",
                                    "Terms of Service",
                                    "Security",
                                ].map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-emerald-500 transition-colors duration-300 text-xs"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-gray-300 font-semibold mb-2 text-xs">
                                Connect
                            </h4>
                            <div className="flex flex-col space-y-2">
                                {[
                                    {
                                        name: "Twitter",
                                        link: "https://twitter.com",
                                        text: "Twitter",
                                    },
                                    {
                                        name: "LinkedIn",
                                        link: "https://linkedin.com",
                                        text: "LinkedIn",
                                    },
                                    {
                                        name: "Facebook",
                                        link: "https://facebook.com",
                                        text: "Facebook",
                                    },
                                    {
                                        name: "Instagram",
                                        link: "https://instagram.com",
                                        text: "Instagram",
                                    },
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.link}
                                        className="text-gray-400 hover:text-emerald-500 transition-colors duration-300 text-xs"
                                    >
                                        {social.text}
                                    </a>
                                ))}

                                {/* Adding email link */}
                                <a
                                    href="mailto:example@example.com"
                                    className="text-gray-400 font-bold hover:text-emerald-500 transition-colors duration-300 text-xs"
                                >
                                    Email Us
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-6 pt-4 text-center">
                        <p className="text-gray-500 text-xs">
                            © 2025 CureLink. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;