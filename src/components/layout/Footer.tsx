import { MapPin, PhoneCall, Clock } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-line bg-soft sm:mt-24">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full p-[1.5px] shadow-sm"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#bf953f 0%,#fcf6ba 35%,#b38728 65%,#aa771c 100%)",
                }}
              >
                <span className="flex h-full w-full items-center justify-center rounded-full bg-ink">
                  <span className="text-gold-gradient text-[13px] font-bold tracking-tight">
                    DE
                  </span>
                </span>
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-gold-gradient text-base font-extrabold tracking-[0.20em]">
                  DJE&apos;S
                </span>
                <span className="text-gold-gradient text-[10px] font-semibold tracking-[0.42em]">
                  EMPIRE
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-zinc-600">
              Boutique officielle DJE&apos;S EMPIRE — Mode, Beauté, Sacs et
              Maison. Vente au détail et en gros, livraison rapide partout au
              Burkina Faso et dans la sous-région.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="https://wa.me/22666937272"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[13.5px] font-medium text-zinc-700 transition-colors hover:text-gold-700"
                >
                  <PhoneCall className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                  +226 66937272
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/22660057171"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[13.5px] font-medium text-zinc-700 transition-colors hover:text-gold-700"
                >
                  <PhoneCall className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                  +226 60057171
                </a>
              </li>
            </ul>
          </div>

          {/* Boutique */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
              Boutique
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-[13.5px] text-zinc-700">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.2} />
                <span>
                  Ouagadougou, Burkina Faso
                  <br />
                  <span className="text-zinc-500">
                    Livraison Bobo-Dioulasso &amp; régions
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-[13.5px] text-zinc-700">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.2} />
                <span>
                  Lundi — Samedi
                  <br />
                  <span className="text-zinc-500">08h00 — 20h00</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="text-[12px] text-zinc-500">
            © {year} DJE&apos;S EMPIRE. Tous droits réservés.
          </p>
          <p className="text-[12px] text-zinc-500">
            Conçu pour la vitesse — Next.js 15 &amp; Tailwind CSS v4
          </p>
        </div>
      </div>
    </footer>
  );
}