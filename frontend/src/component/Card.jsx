// src/components/ui/Card.jsx
const Card = ({ title, subtitle, actions, children, className='' }) => (
  <section className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>
    <header className="px-5 pt-5">
      {title && <h2 className="text-lg font-semibold text-slate-900">{title}</h2>}
      {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
      {actions && <div className="mt-3">{actions}</div>}
    </header>
    <div className="p-5 pt-3">{children}</div>
  </section>
);

export default Card;
