// src/app/page.tsx
export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '20px' }}>
      {/* Simple Header */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
              🍽️
            </div>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>Bidorai</span>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button style={{ padding: '8px 16px', backgroundColor: 'transparent', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}>
              Sign In
            </button>
            <button style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px' }}>
          🎉 SUCCESS! 🎉
        </h1>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '20px' }}>
          Bidorai is Working!
        </h2>
        <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '30px' }}>
          No more Clerk errors! Your Next.js setup is clean and working perfectly.
        </p>
        
        {/* Features */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '40px' }}>
          <div style={{ padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚡</div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Instant Order</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>Order directly at 10% off</p>
          </div>
          
          <div style={{ padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎯</div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Live Bidding</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>Save up to 25% through bidding</p>
          </div>
          
          <div style={{ padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔄</div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Second Chance</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>Match winning bid price</p>
          </div>
        </div>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#ecfdf5', borderRadius: '8px', border: '1px solid #10b981' }}>
          <h3 style={{ color: '#065f46', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
            ✅ Your Bidorai Platform is Ready!
          </h3>
          <p style={{ color: '#047857', fontSize: '16px' }}>
            You can now build the full bidding interface, add user authentication, and create additional pages.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#1f2937', color: 'white', padding: '30px', borderRadius: '10px', marginTop: '20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '15px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#3b82f6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
            🍽️
          </div>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Bidorai</span>
        </div>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
          © 2025 BIDORAI. Making party catering affordable through smart bidding.
        </p>
      </div>
    </div>
  )
}