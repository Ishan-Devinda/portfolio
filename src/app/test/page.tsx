export default function TestPage() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, rgb(15, 23, 42), rgb(2, 6, 23))',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '2rem'
        }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Test Page</h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>If you can see this, the server is working!</p>
            <a
                href="/admin/login"
                style={{
                    backgroundColor: '#22c55e',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontSize: '1.2rem'
                }}
            >
                Go to Admin Login
            </a>
        </div>
    );
}
