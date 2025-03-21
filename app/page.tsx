export default function MainPage() {
  return (
    <main className="bg-gradient-to-b from-[#120329] from-0% via-[#2d0252] via-33% to-[#8e027b] to-50%">
      <div className="h-screen w-full mx-auto container">
        {/* Main content */}
        <h1
          className="text-5xl font-black uppercase tracking-wider bg-clip-text text-transparent 
          bg-gradient-to-b from-[#fff] from-0%  via-[#d173ac] via-75% to-[#f9dfa4] to-100% 
          font-retro font-orbitron pt-10 [text-shadow:0_0_4px_currentColor,0_0_7px_rgba(255,90,200,0.4)]` "
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Neon Tasks
        </h1>
      </div>
    </main>
  );
}
