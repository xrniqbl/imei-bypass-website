"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/', label: 'Beranda' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/harga', label: 'Harga' },
  { href: '/cek-order', label: 'Cek Order' },
  { href: '/kontak', label: 'Kontak' },
];
const WA = "placeholder" ?? '6281234567890';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const isHero = pathname === '/';

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled || !isHero || open
          ? 'bg-background/95 backdrop-blur border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black text-lg">
          <div className={cn(
            'flex h-8 w-8 items-center justify-center rounded-xl transition-colors',
            scrolled || !isHero ? 'bg-primary' : 'bg-white/20 backdrop-blur'
          )}>
            <Shield className={cn('h-4 w-4', scrolled || !isHero ? 'text-white' : 'text-white')} />
          </div>
          <span className={cn('transition-colors', scrolled || !isHero ? 'text-foreground' : 'text-white')}>
            i<span className={scrolled || !isHero ? 'text-primary' : 'text-blue-400'}>Unlock</span>.id
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-2 text-sm rounded-xl transition-all duration-200',
                pathname === link.href
                  ? scrolled || !isHero ? 'text-primary font-semibold bg-primary/10' : 'text-white font-semibold bg-white/15'
                  : scrolled || !isHero ? 'text-muted-foreground hover:text-foreground hover:bg-muted' : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={`https://wa.me/${WA}?text=Halo%20iUnlock.id`}
            target="_blank" rel="noopener noreferrer"
            className={cn('flex items-center gap-1.5 px-3 py-2 text-sm rounded-xl transition-all',
              scrolled || !isHero ? 'text-muted-foreground hover:text-foreground hover:bg-muted' : 'text-white/70 hover:text-white hover:bg-white/10'
            )}
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <Link
            href="/pesan"
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/30 hover:scale-105"
          >
            Pesan Sekarang
          </Link>
        </div>

        <button
          className={cn('md:hidden p-2 rounded-xl transition-colors',
            scrolled || !isHero ? 'text-muted-foreground hover:bg-muted' : 'text-white hover:bg-white/10'
          )}
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav className="container py-3 flex flex-col gap-1">
            {NAV.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                className={cn('px-3 py-2.5 text-sm rounded-xl transition-colors',
                  pathname === link.href ? 'text-primary font-semibold bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/pesan" onClick={() => setOpen(false)}
              className="mt-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white text-center"
            >
              Pesan Sekarang
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
