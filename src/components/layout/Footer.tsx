import { Link } from 'react-router-dom';
import { nav, site } from '@/data/site';
import { services } from '@/data/services';
import { Wordmark } from './Header';

const col = 'mono mb-5 text-dim';
const link = 'block py-1 text-[0.95rem] text-fg transition-colors hover:text-accent';

export function Footer() {
  return (
    <footer className="theme-dark overflow-hidden bg-base text-fg">
      <div className="wrap border-t border-rule pb-8 pt-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4"><Wordmark className="mb-6" /><p className="max-w-sm text-[1.05rem] leading-snug">Architecture and sustainable design, drawn in Nairobi and built to endure.</p></div>
          <div className="md:col-span-2 md:col-start-6"><h4 className={col}>Index</h4>{nav.map((n) => <Link key={n.to} to={n.to} className={link}>{n.label}</Link>)}</div>
          <div className="md:col-span-3"><h4 className={col}>Services</h4>{services.slice(0, 5).map((s) => <Link key={s.slug} to="/services" className={link}>{s.title}</Link>)}</div>
          <div className="md:col-span-3">
            <h4 className={col}>Studio</h4>
            <a className={link} href={`mailto:${site.email}`}>{site.email}</a>
            <a className={link} href={site.phoneHref}>{site.phone}</a>
            <p className="py-1 text-[0.95rem] text-dim">{site.address.join(', ')}</p>
          </div>
        </div>
        <p aria-hidden className="display mt-20 select-none text-center text-[clamp(4rem,19vw,19rem)] leading-[0.8] tracking-[-0.05em] text-fg/[0.07]">ARKYLS</p>
        <div className="mono mt-6 flex flex-wrap justify-between gap-3 border-t border-rule pt-6 text-dim">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>1°17′S 36°49′E</span>
        </div>
      </div>
    </footer>
  );
}
