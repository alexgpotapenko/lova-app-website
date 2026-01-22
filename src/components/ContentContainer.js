export default function ContentContainer({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
