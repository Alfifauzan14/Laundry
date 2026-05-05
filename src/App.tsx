import { useState, useEffect, useRef } from "react";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isInView };
}

/* ───── tiny inline SVG icons ───── */
const Ic = {
  phone: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
        clipRule="evenodd"
      />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path
        fillRule="evenodd"
        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path
        fillRule="evenodd"
        d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  ),
  wa: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.74.45 3.38 1.24 4.81L2 22l5.19-1.24A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm.03 14.5c-.34 0-.68-.04-1.01-.12a6.4 6.4 0 01-2.69-1.58l-.19-.15-1.42.37.38-1.38-.16-.21a6.37 6.37 0 01-1.29-3.38c0-3.54 2.88-6.42 6.42-6.42 3.54 0 6.42 2.88 6.42 6.42 0 3.54-2.88 6.39-6.46 6.39v.16zm3.68-4.83c-.2 0-1.01-.5-1.16-.56-.15-.05-.26-.08-.37.08-.11.15-.43.56-.53.67-.1.11-.2.13-.37.04-.17-.08-.72-.27-1.37-.85-.51-.46-.85-1.02-.95-1.19-.1-.17-.01-.26.08-.34.08-.08.17-.2.26-.3.08-.1.11-.17.17-.28.05-.11.03-.21-.01-.3-.05-.08-.37-.89-.51-1.22-.14-.32-.28-.27-.37-.28h-.32c-.11 0-.28.04-.43.21-.15.17-.57.55-.57 1.35s.59 1.57.67 1.68c.08.11 1.14 1.74 2.76 2.44.39.17.69.27.92.35.39.12.74.1 1.02.06.31-.05 1.01-.41 1.15-.81.14-.4.14-.74.1-.81-.05-.08-.19-.13-.37-.22z" />
    </svg>
  ),
};

/* ───── NAVBAR ───── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { l: "Layanan", h: "#layanan" },
    { l: "Keunggulan", h: "#keunggulan" },
    { l: "Harga", h: "#harga" },
    { l: "Cara Pesan", h: "#cara-pesan" },
    { l: "Kontak", h: "#kontak" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-200 text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M11.25 2.25c-.414 0-.75.336-.75.75v2.25H3.75a.75.75 0 000 1.5h6.75v2.25a.75.75 0 001.5 0V6.75h6.75a.75.75 0 000-1.5h-6.75V3a.75.75 0 00-.75-.75zM6 13.5a.75.75 0 01.75.75v3.75a3.75 3.75 0 007.5 0v-3.75a.75.75 0 011.5 0v3.75a5.25 5.25 0 01-10.5 0v-3.75A.75.75 0 016 13.5z" />
            </svg>
          </div>
          <span
            className={`font-bold text-lg tracking-tight transition-colors ${
              scrolled ? "text-slate-800" : "text-white"
            }`}
          >
            Super Clean Laundry Cianjur
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((n) => (
            <a
              key={n.h}
              href={n.h}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                scrolled
                  ? "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {n.l}
            </a>
          ))}
        </div>

        <a
          href="https://wa.me/6287720394672?text=Halo%2C%20saya%20mau%20tanya%20layanan%20laundry"
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            scrolled
              ? "bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-200"
              : "bg-white text-primary-700 hover:bg-white/90 shadow-lg shadow-black/10"
          }`}
        >
          {Ic.phone}
          Hubungi Kami
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 rounded transition-all duration-300 ${
                scrolled ? "bg-slate-800" : "bg-white"
              } ${open ? "rotate-45 translate-y-[9px]" : ""}`}
            />
            <span
              className={`w-full h-0.5 rounded transition-all duration-300 ${
                scrolled ? "bg-slate-800" : "bg-white"
              } ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`w-full h-0.5 rounded transition-all duration-300 ${
                scrolled ? "bg-slate-800" : "bg-white"
              } ${open ? "-rotate-45 -translate-y-[9px]" : ""}`}
            />
          </div>
        </button>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-slate-100 px-6 py-4 space-y-1">
          {links.map((n) => (
            <a
              key={n.h}
              href={n.h}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-lg text-slate-700 font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              {n.l}
            </a>
          ))}
          <a
            href="https://wa.me/6287720394672"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-3 px-5 py-3 rounded-xl bg-primary-500 text-white font-semibold"
          >
            {Ic.phone}
            Hubungi Kami
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ───── HERO ───── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary-300 rounded-full blur-3xl animate-float delay-300" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-10" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="animate-fade-up opacity-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Buka Setiap Hari · 08.00 – 19.00 WIB
              </div>
            </div>

            <h1 className="animate-fade-up opacity-0 delay-100 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Laundry Profesional
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-100">
                Berkualitas
              </span>
            </h1>

            <p className="animate-fade-up opacity-0 delay-200 text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
              Bersih, rapih, wangi, cepat &amp; kering. Layanan laundry terpercaya
              di Cianjur dengan detergen ramah lingkungan dan mesin cuci modern.
            </p>

            <div className="animate-fade-up opacity-0 delay-300 flex flex-wrap gap-4">
              <a
                href="https://wa.me/6287720394672?text=Halo%2C%20saya%20mau%20pesan%20laundry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-white text-slate-900 font-bold text-base hover:bg-primary-50 transition-all shadow-2xl shadow-black/20 hover:-translate-y-0.5"
              >
                <span className="text-green-600">{Ic.wa}</span>
                Pesan Sekarang
              </a>
              <a
                href="#layanan"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-all"
              >
                Lihat Layanan
                {Ic.arrow}
              </a>
            </div>
          </div>

          {/* Hero visual */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-float">
                <div className="text-center">
                  <div className="text-8xl mb-4">🧺</div>
                  <div className="flex gap-3 justify-center text-4xl">
                    <span className="animate-float delay-100">👕</span>
                    <span className="animate-float delay-200">👗</span>
                    <span className="animate-float delay-300">👖</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-primary-400/20 backdrop-blur-sm border border-primary-300/30 flex items-center justify-center text-3xl animate-float delay-200">
                ✨
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-primary-400/20 backdrop-blur-sm border border-primary-300/30 flex items-center justify-center text-3xl animate-float delay-400">
                🫧
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-white/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

/* ───── LAYANAN (SERVICES) ───── */
function Services() {
  const { ref, isInView } = useInView();
  const services = [
    {
      icon: "⚡",
      title: "Ekspres 4 Jam",
      desc: "Cucian selesai dalam 4 jam. Cocok untuk Anda yang membutuhkan hasil cepat tanpa mengorbankan kualitas.",
    },
    {
      icon: "🚗",
      title: "Antar Jemput",
      desc: "Kami datang ke tempat Anda untuk menjemput dan mengantar cucian. Gratis ongkir area Cianjur!",
    },
    {
      icon: "⚖️",
      title: "Kiloan & Satuan",
      desc: "Layanan cuci kiloan untuk kebutuhan sehari-hari dan satuan untuk pakaian khusus Anda.",
    },
    {
      icon: "🌿",
      title: "Detergen Ramah Lingkungan",
      desc: "Menggunakan detergen eco-friendly yang aman untuk kulit dan ramah lingkungan.",
    },
    {
      icon: "🔧",
      title: "Mesin Cuci Modern",
      desc: "Dilengkapi mesin cuci terbaik dan termodern untuk hasil cucian yang maksimal.",
    },
    {
      icon: "🛡️",
      title: "Tidak Dicampur",
      desc: "Cucian Anda tidak dicampur dengan pelanggan lain. Kebersihan dan privasi terjaga.",
    },
  ];

  return (
    <section id="layanan" className="py-24 bg-slate-50">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
            Layanan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Layanan Jasa Terlengkap
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Kami menyediakan berbagai layanan laundry profesional untuk memenuhi
            kebutuhan Anda sehari-hari.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className={`group bg-white rounded-2xl p-7 border border-slate-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-50 transition-all duration-500 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-2xl mb-5 group-hover:bg-primary-100 group-hover:scale-110 transition-all">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {s.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── KEUNGGULAN (ADVANTAGES) ───── */
function Advantages() {
  const { ref, isInView } = useInView();
  const items = [
    { emoji: "🧹", label: "Bersih" },
    { emoji: "👔", label: "Rapih" },
    { emoji: "🌸", label: "Wangi" },
    { emoji: "⏱️", label: "Cepat" },
    { emoji: "💨", label: "Kering" },
  ];

  return (
    <section id="keunggulan" className="py-24 bg-white">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-700 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
              Mengapa Kami?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
              Keunggulan Yang
              <span className="text-primary-600"> Bisa Dirasakan</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Kami berkomitmen memberikan layanan laundry terbaik dengan standar
              kualitas tinggi. Setiap cucian ditangani dengan penuh perhatian
              untuk memastikan kepuasan Anda.
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {items.map((it, i) => (
                <div
                  key={i}
                  className={`text-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary-200 hover:bg-primary-50 transition-all duration-500 ${
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <div className="text-3xl mb-2">{it.emoji}</div>
                  <div className="text-sm font-semibold text-slate-700">
                    {it.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-700 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-3xl p-10 border border-primary-100">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: "4 Jam", sub: "Layanan Ekspres" },
                  { num: "100%", sub: "Kepuasan" },
                  { num: "Gratis", sub: "Antar Jemput" },
                  { num: "Rp 6rb", sub: "Per Kilo" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className={`text-center bg-white rounded-2xl p-6 shadow-sm transition-all duration-500 ${
                      isInView
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-90"
                    }`}
                    style={{ transitionDelay: `${400 + i * 120}ms` }}
                  >
                    <div className="text-2xl font-extrabold text-primary-600 mb-1">
                      {s.num}
                    </div>
                    <div className="text-sm text-slate-500">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── HARGA (PRICING) ───── */
function Pricing() {
  const { ref, isInView } = useInView();
  return (
    <section id="harga" className="py-24 bg-slate-50">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
            Harga Terjangkau
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Harga &amp; Promo Menarik
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Harga transparan tanpa biaya tersembunyi. Semakin berat cucian,
            semakin besar diskonnya!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Main Price Card */}
          <div
            className={`relative bg-white rounded-3xl p-8 border-2 border-primary-200 shadow-xl shadow-primary-100/50 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="absolute -top-4 left-8 px-4 py-1.5 rounded-full bg-primary-500 text-white text-sm font-bold shadow-lg">
              Harga Reguler
            </div>
            <div className="text-center pt-4">
              <div className="text-6xl font-extrabold text-slate-900 mb-2">
                <span className="text-2xl font-bold text-slate-400">Rp </span>
                6.000
              </div>
              <div className="text-slate-500 font-medium">per kilogram</div>
              <div className="mt-8 space-y-4">
                {[
                  "Cuci + Setrika",
                  "Detergen premium",
                  "Pewangi tahan lama",
                  "Packing rapih",
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                      {Ic.check}
                    </div>
                    <span className="text-slate-600">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Promo Card */}
          <div
            className={`relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-xl transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="absolute -top-4 left-8 px-4 py-1.5 rounded-full bg-amber-500 text-white text-sm font-bold shadow-lg">
              Diskon Kiloan
            </div>
            <div className="text-center pt-4">
              <div className="text-5xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-3">
                Semakin Berat, Semakin Hemat!
              </h3>
              <p className="text-white/70 mb-8">
                Diskon otomatis berlaku untuk cucian dengan berat lebih besar.
                Hemat lebih banyak untuk kebutuhan laundry rutin Anda.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { kg: "3 kg", disc: "5%" },
                  { kg: "5 kg", disc: "10%" },
                  { kg: "10 kg+", disc: "15%" },
                ].map((d, i) => (
                  <div
                    key={i}
                    className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
                  >
                    <div className="text-lg font-bold text-primary-300">
                      {d.disc}
                    </div>
                    <div className="text-white/60 text-sm">{d.kg}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── CARA PESAN (HOW TO ORDER) ───── */
function HowToOrder() {
  const { ref, isInView } = useInView();
  const steps = [
    {
      num: "01",
      icon: "📞",
      title: "Telepon / WhatsApp Kami",
      desc: "Hubungi kami via telepon atau WhatsApp untuk melakukan pemesanan.",
    },
    {
      num: "02",
      icon: "🚗",
      title: "Kami Jemput Cucian Anda",
      desc: "Tim kami akan datang ke lokasi Anda untuk menjemput cucian.",
    },
    {
      num: "03",
      icon: "🧺",
      title: "Kami Cuci & Proses",
      desc: "Cucian Anda dicuci dengan mesin modern dan detergen berkualitas.",
    },
    {
      num: "04",
      icon: "✨",
      title: "Kami Antar Kembali",
      desc: "Cucian bersih, rapih, dan wangi diantarkan kembali ke tempat Anda.",
    },
  ];

  return (
    <section id="cara-pesan" className="py-24 bg-white">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
            Mudah & Praktis
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Cara Pesan
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Hanya 4 langkah mudah untuk mendapatkan cucian bersih dan rapih.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200" />

          {steps.map((s, i) => (
            <div
              key={i}
              className={`relative text-center transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-3xl shadow-xl shadow-primary-200 group-hover:shadow-primary-300 transition-shadow">
                {s.icon}
              </div>
              <div className="text-xs font-bold text-primary-500 tracking-widest mb-2">
                LANGKAH {s.num}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {s.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── KONTAK (CONTACT) ───── */
function Contact() {
  const { ref, isInView } = useInView();
  return (
    <section id="kontak" className="py-24 bg-slate-50">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
            Hubungi Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Lokasi &amp; Kontak
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Kunjungi kami atau hubungi via WhatsApp untuk pemesanan.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Address */}
          <div
            className={`bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 mb-5">
              {Ic.map}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">Alamat</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Jl. Pangeran Hidayatullah No. 68
              <br />
              <span className="text-slate-400">
                (Joglo Atas, 100m ke timur dari perempatan Jl. Abdullah bin
                Nuh)
              </span>
              <br />
              Kecamatan Cianjur, Kab. Cianjur
              <br />
              Jawa Barat 43212
            </p>
          </div>

          {/* Phone */}
          <div
            className={`bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 mb-5">
              {Ic.phone}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">Telepon</h3>
            <div className="space-y-3">

              <a
                href="https://wa.me/6287720394672"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  {Ic.wa}
                </div>
                <div>
                  <div className="text-slate-800 font-semibold group-hover:text-primary-600 transition-colors">
                    0877 2039 4672
                  </div>
                  <div className="text-slate-400 text-xs">WhatsApp</div>
                </div>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div
            className={`bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 mb-5">
              {Ic.clock}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">Jam Buka</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Setiap Hari</span>
                <span className="font-semibold text-slate-800 text-sm">
                  08.00 – 19.00
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Waktu</span>
                <span className="font-semibold text-slate-800 text-sm">
                  WIB
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Map embed placeholder */}
        <div
          className={`mt-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <iframe
            title="Lokasi Super Clean Laundry Cianjur"
            src="https://maps.google.com/maps?q=Jl.+Pangeran+Hidayatullah+No.+68,+Cianjur&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="w-full h-72"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

/* ───── CTA ───── */
function CTA() {
  const { ref, isInView } = useInView();
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-300 rounded-full blur-3xl" />
      </div>
      <div ref={ref} className="max-w-3xl mx-auto px-6 text-center relative">
        <div
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-5xl mb-6">🧺</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Siap Untuk Cucian Bersih &amp; Wangi?
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Hubungi kami sekarang dan nikmati layanan laundry profesional
            dengan harga terjangkau. Antar jemput gratis!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/6287720394672?text=Halo%2C%20saya%20mau%20pesan%20laundry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold text-base hover:bg-primary-50 transition-all shadow-2xl shadow-black/30 hover:-translate-y-0.5"
            >
              <span className="text-green-600">{Ic.wa}</span>
              Chat WhatsApp
            </a>
            <a
              href="tel:087720394672"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-all"
            >
              {Ic.phone}
              Telepon Langsung
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── FOOTER ───── */
function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M11.25 2.25c-.414 0-.75.336-.75.75v2.25H3.75a.75.75 0 000 1.5h6.75v2.25a.75.75 0 001.5 0V6.75h6.75a.75.75 0 000-1.5h-6.75V3a.75.75 0 00-.75-.75zM6 13.5a.75.75 0 01.75.75v3.75a3.75 3.75 0 007.5 0v-3.75a.75.75 0 011.5 0v3.75a5.25 5.25 0 01-10.5 0v-3.75A.75.75 0 016 13.5z" />
                </svg>
              </div>
              <span className="font-bold text-lg">Super Clean Laundry Cianjur</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Laundry profesional berkualitas di Cianjur. Bersih, rapih, wangi,
              cepat &amp; kering.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Layanan</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              <li>Ekspres 4 Jam</li>
              <li>Antar Jemput</li>
              <li>Cuci Kiloan</li>
              <li>Cuci Satuan</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Jam Buka</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              <li>Buka Setiap Hari</li>
              <li>08.00 – 19.00 WIB</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Kontak</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              <li>0877 2039 4672</li>
              <li>Cianjur, Jawa Barat</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Super Clean Laundry Cianjur. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://wa.me/6287720394672"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:bg-primary-500 hover:text-white transition-all"
            >
              {Ic.wa}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───── APP ───── */
export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <Hero />
      <Services />
      <Advantages />
      <Pricing />
      <HowToOrder />
      <Contact />
      <CTA />
      <Footer />
    </div>
  );
}
