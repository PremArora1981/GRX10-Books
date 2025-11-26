import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

const Login: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check for error query param from backend redirect
        const params = new URLSearchParams(window.location.search);
        if (params.get('error') === 'access_denied') {
            setError('Access Denied: Your email is not on the allowed list.');
        }
    }, []);

    const handleLogin = () => {
        window.location.href = '/api/auth/microsoft';
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-slate-100">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={32} />
                </div>

                <h1 className="text-2xl font-bold text-slate-800 mb-2">GRX10 Financial Suite</h1>
                <p className="text-slate-500 mb-8">Secure Access for Authorized Personnel Only</p>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100 flex items-center gap-2 justify-center">
                        <Lock size={16} /> {error}
                    </div>
                )}

                <button
                    onClick={handleLogin}
                    className="w-full bg-[#2F2F2F] text-white py-3 px-4 rounded-lg font-medium hover:bg-black transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    <img src="https://learn.microsoft.com/en-us/entra/identity-platform/media/howto-add-branding-in-apps/ms-symbollockup_mssymbol_19.png" alt="Microsoft" className="w-5 h-5" />
                    Sign in with Microsoft 365
                </button>

                <p className="text-xs text-slate-400 mt-8">
                    By signing in, you agree to the GRX10 security policy.
                    <br />Only whitelisted accounts can access this system.
                </p>
            </div>
        </div>
    );
};

export default Login;
