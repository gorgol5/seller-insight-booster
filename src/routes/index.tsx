import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Heart, User, ShoppingBag, TrendingUp, TrendingDown, Minus, Check } from "lucide-react";
import hero from "@/assets/hero.jpg";
import hoodie from "@/assets/hoodie.jpg";
import slipon from "@/assets/slipon.jpg";
import flats from "@/assets/flats.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "FashionHero — Seller Growth Insights" },
      { name: "description", content: "Wglad w widocznosc, wejscia, zamowienia i wynik po prowizji. Zdecyduj, ktory produkt warto promowac." },
    ],
  }),
});

type Status = "good" | "weak" | "bad";
type Product = {
  id: string;
  name: string;
  seller: string;
  image: string;
  views: number;
  visits: number;
  orders: number;
  returns: number;
  price: number;
  benchmark: number;
  netResult: number;
  status: Status;
  statusLabel: string;
  ctaActive: boolean;
  trend: number[];
  evidence: string[];
};

const products: Product[] = [
  {
    id: "stealth-hoodie",
    name: "Stealth Hoodie",
    seller: "Kamil Studio",
    image: hoodie,
    views: 120,
    visits: 8,
    orders: 0,
    returns: 12,
    price: 149,
    benchmark: 139,
    netResult: 81,
    status: "weak",
    statusLabel: "Slaba konwersja",
    ctaActive: true,
    trend: [3, 5, 4, 6, 8, 7, 9],
    evidence: [
      "Niska liczba wejsc przy 120 wyswietleniach — zdjecie lub tytul nie przyciagaja kliku.",
      "Cena 10 PLN powyzej benchmarku kategorii.",
      "Boost moze odpowiedziec na pytanie, czy problem jest w widocznosci czy w ofercie.",
    ],
  },
  {
    id: "breeze-slip-on",
    name: "Breeze Slip-On",
    seller: "Dorota Shoes",
    image: slipon,
    views: 860,
    visits: 96,
    orders: 18,
    returns: 8,
    price: 189,
    benchmark: 199,
    netResult: 103,
    status: "good",
    statusLabel: "Dobry kandydat",
    ctaActive: true,
    trend: [40, 55, 62, 70, 88, 95, 110],
    evidence: [
      "Stabilny lejek: 11% z wyswietlen wchodzi w karte, 19% z wejsc kupuje.",
      "Cena 10 PLN ponizej benchmarku — przewaga w wynikach.",
      "Niski poziom zwrotow (8%) — boost nie podniesie kosztow obslugi.",
    ],
  },
  {
    id: "black-strap-flats",
    name: "Black Strap Flats",
    seller: "Dorota Shoes",
    image: flats,
    views: 620,
    visits: 54,
    orders: 2,
    returns: 31,
    price: 159,
    benchmark: 145,
    netResult: 34,
    status: "bad",
    statusLabel: "Nie promuj teraz",
    ctaActive: false,
    trend: [80, 75, 60, 55, 48, 40, 38],
    evidence: [
      "Zwroty 31% — boost zwiekszy koszty obslugi i strate.",
      "Wynik po prowizji 34 PLN — mala marza na pokrycie reklamy.",
      "Najpierw popraw opis rozmiarowki, potem rozwaz boost.",
    ],
  },
];

function Topbar() {
  return (
    <div className="bg-ink text-white text-xs tracking-wide text-center py-2.5 px-4">
      Free Shipping on Orders over 299 zl — Easy Returns.
    </div>
  );
}

function Nav() {
  return (
    <nav className="bg-white border-b border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <a href="/" className="font-display italic text-2xl tracking-tight text-ink">FashionHero</a>
          <ul className="hidden md:flex items-center gap-7 text-[13px] font-medium tracking-wide text-ink">
            <li><a href="#">MEN</a></li>
            <li><a href="#">WOMEN</a></li>
            <li><a href="#">SALE</a></li>
            <li><a href="#">NEW</a></li>
          </ul>
        </div>
        <div className="flex items-center gap-5 text-ink">
          <a href="#" className="hidden md:inline text-[13px]">About</a>
          <Search className="w-[18px] h-[18px]" />
          <Heart className="w-[18px] h-[18px]" />
          <User className="w-[18px] h-[18px]" />
          <ShoppingBag className="w-[18px] h-[18px]" />
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative bg-beige-deep">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-0 items-stretch">
        <div className="px-6 lg:px-12 py-16 lg:py-28 flex flex-col justify-center">
          <p className="text-[11px] tracking-[0.2em] uppercase text-ink/60 mb-6">Growth Insights — dla sellerow</p>
          <h1 className="font-display text-5xl lg:text-6xl leading-[1.05] text-ink mb-6">
            Wiedz co promowac,<br/>zanim zaplacisz.
          </h1>
          <p className="text-base text-ink/70 max-w-md leading-relaxed">
            Growth Insights pokazuje widocznosc, wejscia, zamowienia, zwroty, benchmark ceny i szacowany wynik po prowizji. Decyduj na podstawie danych, nie przeczucia.
          </p>
          <div className="mt-10 flex gap-3">
            <a href="#insights" className="bg-ink text-white text-[12px] tracking-[0.15em] uppercase px-7 py-4">Zobacz statystyki</a>
            <a href="#insights" className="border border-ink text-ink text-[12px] tracking-[0.15em] uppercase px-7 py-4">Jak to dziala</a>
          </div>
        </div>
        <div className="relative min-h-[420px] lg:min-h-[640px]">
          <img src={hero} alt="Seller fashion" className="absolute inset-0 w-full h-full object-cover" width={1600} height={1024} />
        </div>
      </div>
    </section>
  );
}

const statusStyles: Record<Status, string> = {
  good: "bg-ink text-white",
  weak: "bg-white text-ink border border-ink",
  bad: "bg-beige-deep text-ink/60 border border-ink/20",
};

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.15em] uppercase text-ink/50">{label}</div>
      <div className="font-display text-2xl text-ink mt-1">{value}</div>
    </div>
  );
}

function ProductCard({ p, selected, onSelect }: { p: Product; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={`text-left group bg-white transition-all ${selected ? "ring-1 ring-ink" : "ring-1 ring-transparent hover:ring-black/10"}`}
    >
      <div className="aspect-[4/5] overflow-hidden bg-beige-deep">
        <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <h3 className="font-display text-xl text-ink leading-tight">{p.name}</h3>
            <p className="text-[12px] text-ink/55 mt-1">{p.seller}</p>
          </div>
          <span className={`text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 ${statusStyles[p.status]}`}>{p.statusLabel}</span>
        </div>
        <div className="grid grid-cols-4 gap-3 mt-5 pt-5 border-t border-black/10">
          <Stat label="Wysw." value={p.views} />
          <Stat label="Wejs." value={p.visits} />
          <Stat label="Zam." value={p.orders} />
          <Stat label="Zwr." value={`${p.returns}%`} />
        </div>
      </div>
    </button>
  );
}

function TrendChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const w = 280;
  const h = 80;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  const trendUp = data[data.length - 1] > data[0];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] tracking-[0.15em] uppercase text-ink/50">Trend 7 dni — wejscia</span>
        <span className="text-[11px] text-ink/60 inline-flex items-center gap-1">
          {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {data[0]} → {data[data.length - 1]}
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20">
        <polyline fill="none" stroke="currentColor" strokeWidth="1.5" points={points} className="text-ink" />
        {data.map((v, i) => {
          const x = (i / (data.length - 1)) * w;
          const y = h - ((v - min) / range) * h;
          return <circle key={i} cx={x} cy={y} r="2" className="fill-ink" />;
        })}
      </svg>
    </div>
  );
}

function Details({ p, onBoost, boosted }: { p: Product; onBoost: () => void; boosted: boolean }) {
  const priceDiff = p.price - p.benchmark;
  const priceUp = priceDiff > 0;
  return (
    <div className="bg-white p-8 lg:p-10 border border-black/10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-ink/50">Wybrany produkt</p>
          <h3 className="font-display text-3xl text-ink mt-1">{p.name}</h3>
          <p className="text-sm text-ink/55">{p.seller}</p>
        </div>
        <span className={`text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 ${statusStyles[p.status]}`}>{p.statusLabel}</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-black/10">
        <div>
          <div className="text-[10px] tracking-[0.15em] uppercase text-ink/50">Benchmark ceny</div>
          <div className="font-display text-2xl text-ink mt-1">{p.price} PLN</div>
          <div className={`text-[12px] mt-1 inline-flex items-center gap-1 ${priceUp ? "text-ink/80" : "text-ink/60"}`}>
            {priceUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            vs {p.benchmark} PLN ({priceUp ? "+" : ""}{priceDiff} PLN)
          </div>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.15em] uppercase text-ink/50">Wynik po prowizji</div>
          <div className="font-display text-2xl text-ink mt-1">{p.netResult} PLN</div>
          <div className="text-[12px] text-ink/55 mt-1">na sprzedana sztuke</div>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.15em] uppercase text-ink/50">Wejscia / 7 dni</div>
          <div className="font-display text-2xl text-ink mt-1">{p.visits}</div>
          <div className="text-[12px] text-ink/55 mt-1">{((p.visits / p.views) * 100).toFixed(1)}% z wyswietlen</div>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.15em] uppercase text-ink/50">Zwroty</div>
          <div className="font-display text-2xl text-ink mt-1">{p.returns}%</div>
          <div className="text-[12px] text-ink/55 mt-1">
            {p.returns < 15 ? "w normie" : "powyzej normy"}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 py-8 border-b border-black/10">
        <div className="text-ink">
          <TrendChart data={p.trend} />
        </div>
        <div>
          <div className="text-[10px] tracking-[0.15em] uppercase text-ink/50 mb-3">Co mowia dane</div>
          <ul className="space-y-2.5">
            {p.evidence.map((e, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink/75 leading-relaxed">
                <Minus className="w-4 h-4 mt-0.5 shrink-0 text-ink/40" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8">
        {boosted ? (
          <div className="bg-beige-deep border border-ink/20 p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="font-display text-lg text-ink">Zapisano sygnal testowy.</p>
                <p className="text-sm text-ink/65 mt-1">
                  To nie uruchamia prawdziwej platnosci ani reklamy. Twoja decyzja zostala zarejestrowana na potrzeby testu.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-ink/50">Test boosta</p>
              <p className="text-sm text-ink/70 mt-1">
                {p.ctaActive
                  ? "Maly platny test, aby sprawdzic czy boost zmienia lejek tego produktu."
                  : "Ten produkt nie jest dobrym kandydatem do promocji w tym tygodniu."}
              </p>
            </div>
            <button
              onClick={onBoost}
              disabled={!p.ctaActive}
              className={`text-[12px] tracking-[0.15em] uppercase px-7 py-4 transition-colors ${
                p.ctaActive
                  ? "bg-ink text-white hover:bg-ink/85"
                  : "bg-transparent text-ink/40 border border-ink/20 cursor-not-allowed"
              }`}
            >
              Uruchom test boosta za 50 PLN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Index() {
  const [selectedId, setSelectedId] = useState<string>(products[1].id);
  const [boostedIds, setBoostedIds] = useState<Set<string>>(new Set());
  const selected = products.find((p) => p.id === selectedId)!;

  const handleBoost = () => {
    setBoostedIds((prev) => new Set(prev).add(selectedId));
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setTimeout(() => {
      document.getElementById("details")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <Nav />
      <Hero />

      <section id="insights" className="bg-background py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-ink/50 mb-3">Growth Insights</p>
              <h2 className="font-display text-4xl lg:text-5xl text-ink leading-tight">Twoje produkty w tym tygodniu</h2>
            </div>
            <p className="text-sm text-ink/55 max-w-xs">Klikaj produkty, aby zobaczyc szczegoly i decyzje, ktora rekomendujemy.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} selected={p.id === selectedId} onSelect={() => handleSelect(p.id)} />
            ))}
          </div>
        </div>
      </section>

      <section id="details" className="bg-beige-deep py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Details p={selected} onBoost={handleBoost} boosted={boostedIds.has(selectedId)} />
        </div>
      </section>

      <footer className="bg-ink text-white/70 py-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-4 text-[12px] tracking-wide">
          <span className="font-display italic text-white text-lg">FashionHero</span>
          <span>Prototyp testowy — Seller Growth Insights. Brak prawdziwych platnosci.</span>
        </div>
      </footer>
    </div>
  );
}
