import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, ShoppingBag, Clock, CheckCircle2,
    XCircle, Loader2, RefreshCw, TrendingUp, Users,
    Lock, ShieldCheck, ArrowRight, LogOut
} from 'lucide-react';
import { getOrders, updateOrderStatus } from '../services/api';

const STATUS_CONFIG = {
    pending: { color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30', icon: Clock, label: 'Pending' },
    in_progress: { color: 'text-blue-400 bg-blue-400/10 border-blue-400/30', icon: Loader2, label: 'In Progress' },
    completed: { color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30', icon: CheckCircle2, label: 'Completed' },
    cancelled: { color: 'text-red-400 bg-red-400/10 border-red-400/30', icon: XCircle, label: 'Cancelled' },
};

// Hardcoded credentials for simple authentication
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'easyweb@2025';

export default function Admin() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updating, setUpdating] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');

    // Check auth on mount
    useEffect(() => {
        const auth = sessionStorage.getItem('ew_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
            fetchOrders();
        }
        document.title = 'Admin Dashboard – EasyWeb';
    }, []);

    const fetchOrders = () => {
        setLoading(true);
        getOrders()
            .then((res) => setOrders(res.data || []))
            .catch(() => setError('Failed to load orders. Is the backend running?'))
            .finally(() => setLoading(false));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginData.username === ADMIN_USER && loginData.password === ADMIN_PASS) {
            sessionStorage.setItem('ew_auth', 'true');
            setIsAuthenticated(true);
            fetchOrders();
            setLoginError('');
        } else {
            setLoginError('Invalid business credentials. Please try again.');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('ew_auth');
        setIsAuthenticated(false);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdating(orderId);
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders((prev) =>
                prev.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o))
            );
        } catch (err) {
            alert(err.message || 'Failed to update status');
        } finally {
            setUpdating(null);
        }
    };

    // Stats
    const total = orders.length;
    const pending = orders.filter((o) => o.order_status === 'pending').length;
    const completed = orders.filter((o) => o.order_status === 'completed').length;
    const revenue = orders
        .filter((o) => o.order_status !== 'cancelled')
        .reduce((acc, o) => acc + parseFloat(o.price || 0), 0);

    const statCards = [
        { label: 'Total Requests', value: total, icon: ShoppingBag, color: 'from-primary-600/20 to-primary-800/20 border-primary-500/30' },
        { label: 'Pending', value: pending, icon: Clock, color: 'from-yellow-600/20 to-yellow-800/20 border-yellow-500/30' },
        { label: 'Completed', value: completed, icon: CheckCircle2, color: 'from-emerald-600/20 to-emerald-800/20 border-emerald-500/30' },
        { label: 'Est. Pipeline', value: `₹${revenue.toLocaleString()}`, icon: TrendingUp, color: 'from-cyan-600/20 to-cyan-800/20 border-cyan-500/30' },
    ];

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
                <div className="glow-orb w-96 h-96 bg-primary-600 -top-20 -left-20 opacity-10" />
                <div className="glow-orb w-96 h-96 bg-neon-blue bottom-0 right-0 opacity-10" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glass">
                            <Lock className="w-8 h-8 text-primary-400" />
                        </div>
                        <h1 className="font-display font-black text-3xl text-white">Admin <span className="gradient-text">Portal</span></h1>
                        <p className="text-gray-400 mt-2">Personal access restricted to authorized personnel.</p>
                    </div>

                    <form onSubmit={handleLogin} className="glass-card p-8 space-y-5">
                        {loginError && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-xs text-center">
                                {loginError}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm text-gray-300 mb-2 font-medium">Username</label>
                            <input
                                type="text"
                                required
                                value={loginData.username}
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                className="input-field"
                                placeholder="Enter admin username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 mb-2 font-medium">Password</label>
                            <input
                                type="password"
                                required
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                className="input-field"
                                placeholder="••••••••"
                            />
                        </div>
                        <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2 group">
                            Unlock Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <p className="text-center text-gray-600 text-xs mt-8">
                        &copy; 2025 EasyWeb • Secure Management System
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-900">
            {/* Header */}
            <div className="bg-dark-800 border-b border-white/10 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600/30 to-neon-blue/20 rounded-xl flex items-center justify-center ring-1 ring-primary-500/30">
                            <LayoutDashboard className="w-5 h-5 text-primary-400" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="font-display font-bold text-2xl text-white">Admin Dashboard</h1>
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            </div>
                            <p className="text-gray-500 text-sm">Welcome back, {ADMIN_USER}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={fetchOrders}
                            disabled={loading}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 btn-secondary text-sm px-5 py-2.5"
                        >
                            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                            Refresh
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-xl px-5 py-2.5 text-sm transition-all"
                        >
                            <LogOut size={14} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {statCards.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`bg-gradient-to-br ${stat.color} border rounded-2xl p-5 shadow-glass`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <stat.icon className="w-6 h-6 text-white/40" />
                                <div className="p-1 bg-white/5 rounded text-[10px] text-gray-500 font-mono uppercase tracking-tighter">Live</div>
                            </div>
                            <p className="font-display font-bold text-2xl text-white">{stat.value}</p>
                            <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Error */}
                {error && (
                    <div className="glass-card border-red-500/30 bg-red-500/10 p-6 text-center text-red-300 mb-6">
                        {error}
                    </div>
                )}

                {/* Orders Table */}
                <div className="glass-card overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/2">
                        <div className="flex items-center gap-2">
                            <Users size={16} className="text-primary-400" />
                            <h2 className="font-display font-semibold text-white">Recent Requests</h2>
                        </div>
                        <span className="badge bg-primary-600/20 text-primary-300 border border-primary-500/30 text-[10px] py-0.5">
                            {total} TOTAL
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <div className="w-10 h-10 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-24">
                            <ShoppingBag size={40} className="mx-auto text-gray-700 mb-4" />
                            <p className="text-gray-400 font-medium">No orders in the database</p>
                            <p className="text-gray-600 text-sm mt-1">New customer orders will automatically appear here.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/2">
                                        {['#ID', 'Lead details', 'Business info', 'Template', 'Base Price', 'Date', 'Status', 'Manage'].map((h) => (
                                            <th key={h} className="text-left px-6 py-4 text-gray-500 font-bold text-[10px] uppercase tracking-widest">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {orders.map((order, i) => {
                                        const status = STATUS_CONFIG[order.order_status] || STATUS_CONFIG.pending;
                                        const StatusIcon = status.icon;
                                        return (
                                            <motion.tr
                                                key={order.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.03 }}
                                                className="hover:bg-white/5 transition-colors group"
                                            >
                                                <td className="px-6 py-5 text-gray-500 font-mono text-xs">#{order.id}</td>
                                                <td className="px-6 py-5">
                                                    <p className="text-white font-semibold">{order.customer_name || order.email}</p>
                                                    <p className="text-gray-500 text-xs mt-0.5">{order.email}</p>
                                                    {order.phone && <p className="text-gray-500 text-[10px] opacity-80 mt-0.5 font-mono">{order.phone}</p>}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <p className="text-gray-300 text-xs font-medium">{order.business_name || '—'}</p>
                                                    {order.business_category && (
                                                        <p className="text-gray-500 text-[10px] mt-0.5">{order.business_category}</p>
                                                    )}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <p className="text-gray-200 text-xs">{order.template_title || '—'}</p>
                                                    <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded-md text-gray-500 mt-1 inline-block uppercase font-bold tracking-tighter">
                                                        {order.template_category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <p className="text-white font-bold text-sm">
                                                        {order.price ? `₹${Number(order.price).toLocaleString()}` : '—'}
                                                    </p>
                                                    <p className={`text-[10px] uppercase font-bold mt-1 ${order.payment_status === 'paid' ? 'text-emerald-500' : 'text-gray-500'}`}>
                                                        {order.payment_status}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-5 text-gray-400 text-xs whitespace-nowrap">
                                                    {new Date(order.created_at).toLocaleDateString('en-IN', {
                                                        day: '2-digit', month: 'short', year: 'numeric',
                                                    })}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className={`badge border ${status.color} flex items-center gap-1.5 w-fit text-[10px] px-2 py-1`}>
                                                        <StatusIcon size={10} className={order.order_status === 'in_progress' ? 'animate-spin' : ''} />
                                                        {status.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    {updating === order.id ? (
                                                        <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <select
                                                            value={order.order_status}
                                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                            className="bg-dark-700 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary-500 transition-all cursor-pointer hover:bg-dark-600"
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="in_progress">In Progress</option>
                                                            <option value="completed">Completed</option>
                                                            <option value="cancelled">Cancelled</option>
                                                        </select>
                                                    )}
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
