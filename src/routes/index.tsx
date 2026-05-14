import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Heart, User, ShoppingBag, TrendingUp, TrendingDown, Minus, Check, Eye, MousePointerClick, ShoppingCart, RotateCcw, Tag, Wallet, Package, Target, AlertTriangle, Wrench } from "lucide-react";
import hero from "@/assets/hero.jpg";
import hoodie from "@/assets/hoodie.jpg";
import slipon from "@/assets/slipon.jpg";
import flats from "@/assets/flats.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "FashionHero — Seller Growth Insights" },
      { name: "description", content: "Wgląd w widoczność, wejścia, zamówienia i wynik po prowizji. Zdecyduj, który produkt warto promować." },
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
  stock: number;
  avgBasket: number;
  searchRank: number;
  wishlist: number;
  status: Status;
  statusLabel: string;
  ctaActive: boolean;
  trend: number[];
  categoryAvg: number[];
  projectedTrend: number[];
  projectedOrders: number;
  evidence: string[];
  fixes: string[];
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
    stock: 24,
    avgBasket: 168,
    searchRank: 38,
    wishlist: 3,
    status: "weak",
    statusLabel: "Słaba konwersja",
    ctaActive: true,
    trend: [3, 5, 4, 6, 8, 7, 9],
    categoryAvg: [12, 14, 13, 15, 16, 15, 17],
    projectedTrend: [9, 14, 22, 30, 36, 41, 45],
    projectedOrders: 6,
    evidence: [
      "Niska liczba wejść przy 120 wyświetleniach — zdjęcie lub tytuł nie przyciągają kliknięcia.",
      "Cena 10 PLN powyżej benchmarku kategorii.",
      "Pozycja 38 w wyszukiwarce — produkt znika z pierwszej strony wyników.",
      "Boost odpowie na pytanie, czy problem jest w widoczności, czy w samej ofercie.",
    ],
    fixes: [
      "Dodaj 2. zdjęcie produktu — najlepiej noszone na modelu, nie packshot.",
      "Skróć tytuł do 60 znaków i przenieś kolor na koniec.",
      "Obniż cenę o 10 PLN do poziomu benchmarku kategorii.",
      "Uzupełnij tabelę rozmiarów — pomoże też w zwrotach.",
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
    stock: 142,
    avgBasket: 224,
    searchRank: 6,
    wishlist: 47,
    status: "good",
    statusLabel: "Dobry kandydat",
    ctaActive: true,
    trend: [40, 55, 62, 70, 88, 95, 110],
    categoryAvg: [60, 62, 65, 68, 72, 75, 78],
    projectedTrend: [110, 145, 180, 210, 240, 268, 295],
    projectedOrders: 56,
    evidence: [
      "Stabilny lejek: 11% z wyświetleń wchodzi w kartę, 19% z wejść kupuje.",
      "Cena 10 PLN poniżej benchmarku — przewaga w wynikach wyszukiwania.",
      "Niski poziom zwrotów (8%) — boost nie podniesie kosztów obsługi.",
      "47 osób dodało do listy życzeń — rozgrzany popyt czeka na impuls.",
    ],
    fixes: [],
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
    stock: 9,
    avgBasket: 159,
    searchRank: 14,
    wishlist: 11,
    status: "bad",
    statusLabel: "Nie promuj teraz",
    ctaActive: false,
    trend: [80, 75, 60, 55, 48, 40, 38],
    categoryAvg: [70, 70, 68, 66, 64, 62, 60],
    projectedTrend: [38, 42, 48, 54, 58, 62, 65],
    projectedOrders: 14,
    evidence: [
      "Zwroty 31% — boost zwiększy koszty obsługi i stratę.",
      "Wynik po prowizji 34 PLN — mała marża na pokrycie reklamy.",
      "Stan magazynu 9 sztuk — promocja może wyczerpać zapas w 2 dni.",
      "Najpierw popraw opis rozmiarówki, potem rozważ boost.",
    ],
    fixes: [
      "Przepisz opis rozmiarówki — wskaż „dobierz rozmiar w górę”.",
      "Dodaj zdjęcie boczne stopy — pokaż realną szerokość.",
      "Uzupełnij stan magazynu zanim rozważysz promocję.",
    ],
  },
];

type Segment = "all" | "good" | "weak" | "bad";
const segments: { id: Segment; label: string }[] = [
  { id: "all", label: "Wszystkie" },
  { id: "good", label: "Kandydaci do boosta" },
  { id: "weak", label: "Do poprawy" },
  { id: "bad", label: "Nie promuj teraz" },
];

function Topbar() {
  return (
    <div className="bg-ink text-white text-xs tracking-wide text-center py-2.5 px-4">
      Darmowa dostawa od 299 zł — łatwe zwroty w 30 dni.
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
            <li><a href="#">MĘŻCZYŹNI</a></li>
            <li><a href="#">KOBIETY</a></li>
            <li><a href="#">WYPRZEDAŻ</a></li>
            <li><a href="#">NOWOŚCI</a></li>
          </ul>
        </div>
        <div className="flex items-center gap-5 text-ink">
          <a href="#how" className="hidden md:inline text-[13px]">Jak to działa</a>
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
          <p className="text-[11px] tracking-[0.2em] uppercase text-ink/60 mb-6">Growth Insights — dla sprzedawców</p>
          <h1 className="font-display text-5xl lg:text-6xl leading-[1.05] text-ink mb-6">
            Wiedz co promować,<br/>zanim zapłacisz.
          </h1>
          <p className="text-base text-ink/70 max-w-md leading-relaxed">
            Growth Insights pokazuje widoczność, wejścia, zamówienia, zwroty, benchmark ceny i szacowany wynik po prowizji. Decyduj na podstawie danych, nie przeczucia.
          </p>
          <div className="mt-10 flex gap-3">
            <a href="#insights" className="bg-ink text-white text-[12px] tracking-[0.15em] uppercase px-7 py-4">Zobacz statystyki</a>
            <a href="#how" className="border border-ink text-ink text-[12px] tracking-[0.15em] uppercase px-7 py-4">Jak to działa</a>
          </div>
        </div>
        <div className="relative min-h-[420px] lg:min-h-[640px]">
          <img src={hero} alt="Sprzedawca mody" className="absolute inset-0 w-full h-full object-cover" width={1600} height={1024} />
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
          <Stat label="Wyśw." value={p.views} />
          <Stat label="Wejś." value={p.visits} />
          <Stat label="Zam." value={p.orders} />
          <Stat label="Zwr." value={`${p.returns}%`} />
        </div>
      </div>
    </button>
  );
}

function TrendChart({ data, categoryAvg, projected }: { data: number[]; categoryAvg: number[]; projected?: number[] }) {
  const all = [...data, ...categoryAvg, ...(projected ?? [])];
  const max = Math.max(...all);
  const min = Math.min(...all);
  const range = Math.max(1, max - min);
  const w = 280;
  const h = 80;
  const toPoints = (arr: number[]) => arr.map((v, i) => {
    const x = (i / (arr.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  const trendUp = data[data.length - 1] > data[0];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] tracking-[0.15em] uppercase text-ink/50">Trend 7 dni — wejścia</span>
        <span className="text-[11px] text-ink/60 inline-flex items-center gap-1">
          {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {data[0]} → {data[data.length - 1]}
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20">
        <polyline fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" points={toPoints(categoryAvg)} className="text-ink/30" />
        <polyline fill="none" stroke="currentColor" strokeWidth="1.5" points={toPoints(data)} className="text-ink" />
        {data.map((v, i) => {
          const x = (i / (data.length - 1)) * w;
          const y = h - ((v - min) / range) * h;
          return <circle key={i} cx={x} cy={y} r="2" className="fill-ink" />;
        })}
        {projected && (
          <polyline fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" points={toPoints(projected)} className="text-ink/60" />
        )}
      </svg>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 text-[11px] text-ink/55">
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-px bg-ink" /> Twój produkt</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-px bg-ink/30" style={{ borderTop: "1px dashed" }} /> Średnia kategorii</span>
        {projected && <span className="inline-flex items-center gap-1.5"><span className="w-3 h-px bg-ink/60" style={{ borderTop: "1px dashed" }} /> Projekcja po booście</span>}
      </div>
    </div>
  );
}

function MetricTile({ icon: Icon, label, value, hint }: { icon: typeof Eye; label: string; value: string; hint?: string }) {
  return (
    <div className="border border-black/10 p-4">
      <div className="flex items-center gap-2 text-ink/55">
        <Icon className="w-3.5 h-3.5" />
        <span className="text-[10px] tracking-[0.15em] uppercase">{label}</span>
      </div>
      <div className="font-display text-2xl text-ink mt-2">{value}</div>
      {hint && <div className="text-[12px] text-ink/55 mt-1">{hint}</div>}
    </div>
  );
}

function Details({ p, onBoost, boosted }: { p: Product; onBoost: () => void; boosted: boolean }) {
  const priceDiff = p.price - p.benchmark;
  const priceUp = priceDiff > 0;
  const ctr = ((p.visits / p.views) * 100).toFixed(1);
  const conv = p.visits > 0 ? ((p.orders / p.visits) * 100).toFixed(1) : "0.0";
  const revenue = p.orders * p.netResult;
  const stockRisk = p.ctaActive && p.projectedOrders > p.stock;

  return (
    <div className="bg-white p-8 lg:p-10 border border-black/10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-ink/50">Wybrany produkt</p>
          <h3 className="font-display text-3xl text-ink mt-1">{p.name}</h3>
          <p className="text-sm text-ink/55">{p.seller}</p>
        </div>
        <span className={`text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 ${statusStyles[p.status]}`}>{p.statusLabel}</span>
      </div>

      {stockRisk && (
        <div className="flex items-start gap-3 border border-ink/30 bg-beige-deep px-5 py-4 mb-8">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-ink" />
          <div className="text-sm text-ink/80">
            <span className="font-medium text-ink">Uwaga: ryzyko wyczerpania zapasu.</span> Projekcja boosta to ok. <strong>{p.projectedOrders} zamówień</strong> w 7 dni, a w magazynie masz <strong>{p.stock} szt.</strong> Uzupełnij stan lub ogranicz budżet, żeby reklama nie pracowała w próżnię.
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pb-8 border-b border-black/10">
        <MetricTile icon={Eye} label="Wyświetlenia" value={p.views.toString()} hint="ostatnie 7 dni" />
        <MetricTile icon={MousePointerClick} label="Wejścia w kartę" value={p.visits.toString()} hint={`CTR ${ctr}%`} />
        <MetricTile icon={ShoppingCart} label="Zamówienia" value={p.orders.toString()} hint={`konwersja ${conv}%`} />
        <MetricTile icon={RotateCcw} label="Zwroty" value={`${p.returns}%`} hint={p.returns < 15 ? "w normie" : "powyżej normy"} />
        <MetricTile icon={Tag} label="Cena" value={`${p.price} PLN`} hint={`benchmark ${p.benchmark} PLN (${priceUp ? "+" : ""}${priceDiff})`} />
        <MetricTile icon={Wallet} label="Wynik po prowizji" value={`${p.netResult} PLN`} hint={`przychód 7 dni: ${revenue} PLN`} />
        <MetricTile icon={Package} label="Stan magazynu" value={p.stock.toString()} hint={p.stock < 20 ? "niski zapas" : "wystarczający"} />
        <MetricTile icon={Target} label="Pozycja w wyszukiwarce" value={`#${p.searchRank}`} hint={`lista życzeń: ${p.wishlist}`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-10 py-8 border-b border-black/10">
        <div className="text-ink">
          <TrendChart data={p.trend} categoryAvg={p.categoryAvg} projected={boosted ? p.projectedTrend : undefined} />
          {boosted && (
            <p className="text-[12px] text-ink/60 mt-4 leading-relaxed">
              Projekcja oparta na średnim wzroście wejść po booście w Twojej kategorii (+{Math.round(((p.projectedTrend[6] - p.trend[6]) / Math.max(1, p.trend[6])) * 100)}%). To symulacja na potrzeby testu, nie gwarancja wyniku.
            </p>
          )}
        </div>
        <div>
          <div className="text-[10px] tracking-[0.15em] uppercase text-ink/50 mb-3">Co mówią dane</div>
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

      {p.fixes.length > 0 && (
        <div className="py-8 border-b border-black/10">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-4 h-4 text-ink/60" />
            <span className="text-[10px] tracking-[0.15em] uppercase text-ink/55">Popraw bez wydawania na reklamę</span>
          </div>
          <ul className="grid md:grid-cols-2 gap-3">
            {p.fixes.map((f, i) => (
              <li key={i} className="flex items-start gap-3 border border-black/10 p-4">
                <span className="font-display text-ink/30 text-sm leading-none mt-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm text-ink/75 leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
          <p className="text-[12px] text-ink/50 mt-4">Te zmiany są darmowe. Często dają większy efekt na konwersji niż dopłata do widoczności.</p>
        </div>
      )}

      <div className="pt-8">
        {boosted ? (
          <div className="bg-beige-deep border border-ink/20 p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="font-display text-lg text-ink">Zapisano sygnał testowy.</p>
                <p className="text-sm text-ink/65 mt-1">
                  To nie uruchamia prawdziwej płatności ani reklamy. Twoja decyzja została zarejestrowana wyłącznie na potrzeby testu produktowego. Powyżej widzisz, jak mógłby wyglądać lejek po 48 h boosta.
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
                  ? "Mały płatny test, aby sprawdzić czy boost zmienia lejek tego produktu."
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

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Zbieramy sygnały",
      body: "Co noc agregujemy wyświetlenia, wejścia w kartę, zamówienia, zwroty, ceny konkurencji, stan magazynu i pozycję w wyszukiwarce FashionHero.",
    },
    {
      n: "02",
      title: "Liczymy lejek i wynik",
      body: "Z surowych liczb wyliczamy CTR, konwersję, średni koszyk i wynik po prowizji marketplace. Porównujemy do benchmarku Twojej kategorii.",
    },
    {
      n: "03",
      title: "Rekomendujemy decyzję",
      body: "Każdy produkt dostaje status: dobry kandydat do boosta, słaba konwersja do poprawy lub nie promuj teraz. Zawsze z uzasadnieniem opartym na danych.",
    },
    {
      n: "04",
      title: "Uruchamiasz mikro-test",
      body: "Boost za 50 PLN to 48-godzinny test widoczności. Po nim wracamy z porównaniem lejka przed i po — bez długich kampanii w ciemno.",
    },
  ];
  return (
    <section id="how" className="bg-white py-20 lg:py-28 border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-5">
            <p className="text-[11px] tracking-[0.2em] uppercase text-ink/50 mb-3">Jak to działa</p>
            <h2 className="font-display text-4xl lg:text-5xl text-ink leading-tight">Cztery kroki od liczby do decyzji.</h2>
          </div>
          <p className="lg:col-span-7 text-base text-ink/70 leading-relaxed lg:pt-12">
            Growth Insights nie zastępuje Twojej intuicji jako sprzedawcy — daje jej kontekst. Zamiast zgadywać, który produkt warto rozkręcić, widzisz cały lejek w jednym miejscu i testujesz hipotezy małymi krokami.
          </p>
        </div>
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border border-black/10">
          {steps.map((s) => (
            <li key={s.n} className="bg-white p-7 flex flex-col">
              <span className="font-display text-3xl text-ink/30">{s.n}</span>
              <h3 className="font-display text-xl text-ink mt-6">{s.title}</h3>
              <p className="text-sm text-ink/65 mt-3 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="text-[12px] text-ink/50 mt-8 max-w-2xl">
          Prototyp testowy. Liczby na stronie są przykładowe, a przycisk boosta nie pobiera prawdziwej płatności ani nie uruchamia reklamy — służy do walidacji koncepcji z sellerami.
        </p>
      </div>
    </section>
  );
}

function Index() {
  const [selectedId, setSelectedId] = useState<string>(products[1].id);
  const [boostedIds, setBoostedIds] = useState<Set<string>>(new Set());
  const [segment, setSegment] = useState<Segment>("all");
  const selected = products.find((p) => p.id === selectedId)!;

  const filtered = useMemo(
    () => (segment === "all" ? products : products.filter((p) => p.status === segment)),
    [segment],
  );

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
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-ink/50 mb-3">Growth Insights</p>
              <h2 className="font-display text-4xl lg:text-5xl text-ink leading-tight">Twoje produkty w tym tygodniu</h2>
            </div>
            <p className="text-sm text-ink/55 max-w-xs">Klikaj produkty, aby zobaczyć szczegóły i decyzję, którą rekomendujemy.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-black/10 pb-4">
            {segments.map((s) => {
              const count = s.id === "all" ? products.length : products.filter((p) => p.status === s.id).length;
              const active = segment === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSegment(s.id)}
                  className={`text-[11px] tracking-[0.15em] uppercase px-4 py-2 transition-colors ${
                    active ? "bg-ink text-white" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {s.label} <span className={active ? "text-white/60" : "text-ink/40"}>({count})</span>
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-ink/55 py-12">Brak produktów w tym segmencie w tym tygodniu.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} p={p} selected={p.id === selectedId} onSelect={() => handleSelect(p.id)} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="details" className="bg-beige-deep py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Details p={selected} onBoost={handleBoost} boosted={boostedIds.has(selectedId)} />
        </div>
      </section>

      <HowItWorks />

      <footer className="bg-ink text-white/70 py-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-4 text-[12px] tracking-wide">
          <span className="font-display italic text-white text-lg">FashionHero</span>
          <span>Prototyp testowy — Seller Growth Insights. Brak prawdziwych płatności.</span>
        </div>
      </footer>
    </div>
  );
}
