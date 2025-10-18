// src/components/ui/Button.jsx
const variants = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-600',
  secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 focus:ring-slate-400',
  ghost: 'hover:bg-slate-100 text-slate-700 focus:ring-slate-300',
};
const sizes = { sm:'h-8 px-3 text-sm', md:'h-10 px-4', lg:'h-12 px-5 text-lg' };

const Button = ({ children, variant='primary', size='md', full=false, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${full?'w-full':''}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
