import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, User, Lock, AlertCircle, ShieldCheck } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const user = await login(username, password);
            if (user.is_admin) {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Invalid credentials. Please try again or contact your administrator.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'radial-gradient(circle at 0% 0%, #1e1b4b 0%, #0f172a 50%, #000 100%)',
            padding: '1.5rem'
        }}>
            <div className="glass-card animate-fade-in" style={{
                padding: '3.5rem 2.5rem',
                width: '100%',
                maxWidth: '440px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative background glow */}
                <div style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-20%',
                    width: '200px',
                    height: '200px',
                    background: 'var(--primary)',
                    filter: 'blur(100px)',
                    opacity: 0.15,
                    zIndex: 0
                }}></div>

                <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'inline-flex',
                        padding: '1rem',
                        borderRadius: '1.25rem',
                        background: 'rgba(99, 102, 241, 0.1)',
                        marginBottom: '1.5rem',
                        color: 'var(--primary)',
                        border: '1px solid rgba(99, 102, 241, 0.2)'
                    }}>
                        <ShieldCheck size={40} strokeWidth={1.5} />
                    </div>
                    <h1 className="logo-text" style={{ fontSize: '2.25rem', justifyContent: 'center', marginBottom: '0.25rem' }}>
                        IdealIt <span className="logo-accent">Techno</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        Offline Assessment Portal
                    </p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        color: 'var(--error)',
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.9rem',
                        lineHeight: '1.4'
                    }}>
                        <AlertCircle size={20} style={{ flexShrink: 0 }} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-muted)' }}>Candidate ID</label>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                <User size={18} />
                            </div>
                            <input
                                type="text"
                                className="input-field"
                                style={{ paddingLeft: '3.25rem' }}
                                placeholder="Enter your User ID"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-muted)' }}>Safe Password</label>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                className="input-field"
                                style={{ paddingLeft: '3.25rem' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', height: '3.5rem', fontSize: '1.1rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Authenticating...' : (
                            <>
                                <LogIn size={20} />
                                Access Assessment
                            </>
                        )}
                    </button>
                </form>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.6 }}>
                        &copy; 2025 IdealIt Techno Platform. All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
