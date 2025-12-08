import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock, User, Mail } from 'lucide-react';

const Login: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [loginMethod, setLoginMethod] = useState<'sso' | 'email'>('sso');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check for error query param from backend redirect
        const params = new URLSearchParams(window.location.search);
        if (params.get('error') === 'access_denied') {
            setError('Access Denied: Your email is not on the allowed list.');
        }
    }, []);

    const handleMicrosoftLogin = () => {
        window.location.href = '/api/auth/microsoft';
    };

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                // Reload to check auth status
                window.location.reload();
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 dark:bg-slate-900 flex flex-col items-center justify-center p-4">
            <div className="bg-slate-800 dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-slate-700 dark:border-slate-700">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={32} />
                </div>

                <h1 className="text-2xl font-bold text-slate-100 dark:text-slate-100 mb-2">GRX10 Financial Suite</h1>
                <p className="text-slate-400 dark:text-slate-400 mb-8">Secure Access for Authorized Personnel Only</p>

                {/* Login Method Toggle */}
                <div className="flex gap-2 mb-6 bg-slate-700 dark:bg-slate-700 p-1 rounded-lg">
                    <button
                        onClick={() => { setLoginMethod('sso'); setError(null); }}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                            loginMethod === 'sso'
                                ? 'bg-emerald-500 text-white shadow-sm'
                                : 'text-slate-300 hover:text-slate-100'
                        }`}
                    >
                        SSO
                    </button>
                    <button
                        onClick={() => { setLoginMethod('email'); setError(null); }}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                            loginMethod === 'email'
                                ? 'bg-emerald-500 text-white shadow-sm'
                                : 'text-slate-300 hover:text-slate-100'
                        }`}
                    >
                        EMAIL
                    </button>
                </div>

                {error && (
                    <div className="bg-red-900/30 text-red-400 p-3 rounded-lg text-sm mb-6 border border-red-800 dark:border-red-800 flex items-center gap-2 justify-center">
                        <Lock size={16} /> {error}
                    </div>
                )}

                {loginMethod === 'sso' ? (
                    <>
                        <button
                            onClick={handleMicrosoftLogin}
                            className="w-full bg-[#2F2F2F] text-white py-3 px-4 rounded-lg font-medium hover:bg-black transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <img src="https://learn.microsoft.com/en-us/entra/identity-platform/media/howto-add-branding-in-apps/ms-symbollockup_mssymbol_19.png" alt="Microsoft" className="w-5 h-5" />
                            Sign in with Microsoft 365
                        </button>
                    </>
                ) : (
                    <form onSubmit={handleAdminLogin} className="space-y-4">
                        <div>
                            <label className="block text-left text-sm font-medium text-slate-300 dark:text-slate-300 mb-2">
                                Email / Employee ID
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-400" size={18} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-700 dark:bg-slate-700 border border-slate-600 dark:border-slate-600 rounded-lg text-slate-100 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                    placeholder="Enter email or employee ID"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-left text-sm font-medium text-slate-300 dark:text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-400" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-700 dark:bg-slate-700 border border-slate-600 dark:border-slate-600 rounded-lg text-slate-100 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <ShieldCheck size={18} />
                                    Sign in
                                </>
                            )}
                        </button>
                    </form>
                )}

                <p className="text-xs text-slate-400 dark:text-slate-400 mt-8">
                    By signing in, you agree to the GRX10 security policy.
                    <br />Only authorized accounts can access this system.
                </p>
            </div>
        </div>
    );
};

export default Login;
