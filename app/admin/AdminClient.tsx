'use client'
import { useEffect, useState, useMemo } from 'react'
import { 
    Users, 
    Zap, 
    BarChart3, 
    MessageSquare, 
    ArrowRight, 
    Loader2, 
    Shield, 
    Clock, 
    TrendingUp,
    ExternalLink,
    Mail,
    Search,
    Filter,
    CreditCard,
    Calendar,
    ChevronRight,
    UserCheck,
    AlertCircle
} from 'lucide-react'
import { 
    FadeIn, 
    StaggerContainer, 
    StaggerItem 
} from '@/components/ui/motion'
import { format, parseISO } from 'date-fns'

type Tab = 'overview' | 'users' | 'analyses' | 'subscriptions' | 'feedback' | 'newsletter'

export default function AdminClient() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<Tab>('overview')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats')
                if (!res.ok) {
                    if (res.status === 403) throw new Error('Access Denied: Superadmin only')
                    throw new Error('Failed to fetch admin stats')
                }
                const json = await res.json()
                setData(json)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    const filteredUsers = useMemo(() => {
        if (!data?.users) return []
        return data.users.filter((u: any) => 
            u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    }, [data?.users, searchQuery])

    const filteredAnalyses = useMemo(() => {
        if (!data?.analyses) return []
        return data.analyses.filter((a: any) => 
            a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.users?.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [data?.analyses, searchQuery])

    if (loading) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Gathering intelligence...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center gap-4 text-center px-6">
                <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-xl font-black text-white uppercase tracking-tight">{error}</h1>
                <p className="text-slate-500 text-sm max-w-xs">This area is highly restricted. Return to your dashboard.</p>
            </div>
        )
    }

    const { stats, feedback, subscribers } = data

    const tabs: { id: Tab; label: string; icon: any }[] = [
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'analyses', label: 'Analyses', icon: BarChart3 },
        { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
        { id: 'feedback', label: 'Feedback', icon: MessageSquare },
        { id: 'newsletter', label: 'Newsletter', icon: Mail },
    ]

    return (
        <div className="p-8 max-w-7xl mx-auto relative z-10 pb-20 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 mt-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                            <Shield className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h1 className="font-display text-4xl font-black text-white tracking-tight uppercase">
                            Admin Center
                        </h1>
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest opacity-60">
                        Command & Control Matrix
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-5 py-2 rounded-full bg-green-500/5 border border-green-500/10 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Global Status: Active</span>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 mb-10 p-1.5 rounded-2xl bg-white/2 border border-white/5 backdrop-blur-xl w-fit overflow-x-auto no-scrollbar max-w-full">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            setActiveTab(tab.id)
                            setSearchQuery('')
                        }}
                        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                            ${activeTab === tab.id 
                                ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-[1.02]' 
                                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                            }`}
                    >
                        <tab.icon className="w-3.5 h-3.5" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[500px]">
                {activeTab === 'overview' && (
                    <FadeIn key="overview" className="space-y-12">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {[
                                { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
                                { label: 'Growth Subs', value: stats.activeSubscriptions, icon: Zap, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                                { label: 'Analyses', value: stats.totalAnalyses, icon: BarChart3, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                                { label: 'Feedback', value: stats.totalFeedback, icon: MessageSquare, color: 'text-green-400', bg: 'bg-green-500/10' },
                                { label: 'Email List', value: stats.totalSubscribers, icon: Mail, color: 'text-orange-400', bg: 'bg-orange-500/10' }
                            ].map((stat) => (
                                <div key={stat.label} className="p-6 rounded-[2rem] bg-white/2 border border-white/5 group hover:border-white/10 transition-all">
                                    <div className={`w-10 h-10 rounded-2xl ${stat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                    </div>
                                    <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</h3>
                                    <p className="text-2xl font-black text-white">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-indigo-400" />
                                    Latest Signal Activity
                                </h2>
                                <div className="space-y-3">
                                    {data.analyses.slice(0, 5).map((a: any) => (
                                        <div key={a.id} className="p-4 rounded-2xl bg-white/2 border border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                                                    <BarChart3 className="w-4 h-4 text-slate-500" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[11px] font-bold text-white truncate">{a.title || 'Untitled'}</p>
                                                    <p className="text-[9px] text-slate-600 font-bold uppercase">{a.users?.email}</p>
                                                </div>
                                            </div>
                                            <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                                {format(parseISO(a.created_at), 'HH:mm')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                                    <UserCheck className="w-5 h-5 text-green-400" />
                                    Recent Deployments
                                </h2>
                                <div className="space-y-3">
                                    {data.users.slice(0, 5).map((u: any) => (
                                        <div key={u.id} className="p-4 rounded-2xl bg-white/2 border border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center font-black text-[10px] text-slate-500">
                                                    {u.email[0].toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[11px] font-bold text-white truncate">{u.email}</p>
                                                    <p className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">{u.plan} · {u.subscription_status}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-800" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                )}

                {(activeTab === 'users' || activeTab === 'analyses') && (
                    <FadeIn key={activeTab} className="space-y-6">
                        <div className="flex items-center gap-4 bg-white/2 border border-white/5 rounded-2xl p-2 pl-4">
                            <Search className="w-4 h-4 text-slate-500" />
                            <input 
                                type="text"
                                placeholder={`Search ${activeTab}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-slate-600 w-full"
                            />
                        </div>

                        <div className="bg-white/2 border border-white/5 rounded-[2.5rem] overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-white/2 border-b border-white/5">
                                    <tr>
                                        {activeTab === 'users' ? (
                                            <>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Email</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Plan</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Joined</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Admin</th>
                                            </>
                                        ) : (
                                            <>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Title</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">User</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Entries</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Date</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/2">
                                    {(activeTab === 'users' ? filteredUsers : filteredAnalyses).map((item: any) => (
                                        <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                            {activeTab === 'users' ? (
                                                <>
                                                    <td className="px-6 py-4">
                                                        <div className={`w-2 h-2 rounded-full ${item.subscription_status === 'active' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-slate-700'}`} />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-[11px] font-bold text-white">{item.email}</p>
                                                        <p className="text-[9px] text-slate-600 font-medium">{item.id.slice(0, 8)}...</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${item.plan === 'growth' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/5 text-slate-500'}`}>
                                                            {item.plan}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase">
                                                        {format(parseISO(item.created_at), 'MMM d, yyyy')}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        {item.is_admin ? <Shield className="w-3.5 h-3.5 text-indigo-500 ml-auto" /> : <div className="w-3.5 h-3.5 bg-white/5 rounded-full ml-auto opacity-20" />}
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                                            item.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                                                            item.status === 'failed' ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-slate-400'
                                                        }`}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-[11px] font-bold text-white truncate max-w-[200px]">{item.title || 'Untitled Analysis'}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-[10px] font-bold text-slate-500 truncate max-w-[150px]">{item.users?.email}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-[10px] font-black text-slate-400">
                                                        {item.total_entries || 0}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <p className="text-[10px] font-bold text-slate-600 uppercase">
                                                            {format(parseISO(item.created_at), 'MM/dd HH:mm')}
                                                        </p>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {(activeTab === 'users' ? filteredUsers : filteredAnalyses).length === 0 && (
                                <div className="py-20 text-center">
                                    <AlertCircle className="w-10 h-10 text-slate-800 mx-auto mb-4" />
                                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">No records intercepted</p>
                                </div>
                            )}
                        </div>
                    </FadeIn>
                )}

                {activeTab === 'subscriptions' && (
                    <FadeIn key="subscriptions" className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { label: 'Active Growth', value: stats.activeSubscriptions, icon: Zap, detail: 'Current paying sub-cohorts' },
                                { label: 'Free Tier', value: stats.totalUsers - stats.activeSubscriptions, icon: Users, detail: 'Potential pipeline' },
                                { label: 'Conversion', value: `${((stats.activeSubscriptions / stats.totalUsers) * 100).toFixed(1)}%`, icon: TrendingUp, detail: 'Free-to-Growth efficiency' }
                            ].map((item) => (
                                <div key={item.label} className="p-8 rounded-[2.5rem] bg-white/2 border border-white/5">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                                        <item.icon className="w-6 h-6 text-slate-500" />
                                    </div>
                                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.label}</h3>
                                    <p className="text-3xl font-black text-white mb-2">{item.value}</p>
                                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">{item.detail}</p>
                                </div>
                            ))}
                        </div>
                        
                        <div className="bg-white/2 border border-white/5 rounded-[2.5rem] p-8">
                            <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-8 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-purple-400" />
                                Subscription Oversight
                            </h2>
                            <div className="space-y-4">
                                {data.users.filter((u: any) => u.subscription_id).map((u: any) => (
                                    <div key={u.id} className="p-5 rounded-3xl bg-white/2 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-black text-indigo-400">
                                                $
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-bold text-white">{u.email}</p>
                                                <p className="text-[9px] text-slate-600 font-bold uppercase">{u.subscription_id}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-white uppercase tracking-widest">{u.billing_interval || 'monthly'}</p>
                                                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">Interval</p>
                                            </div>
                                            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                u.subscription_status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                            }`}>
                                                {u.subscription_status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                )}

                {activeTab === 'feedback' && (
                    <FadeIn key="feedback" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {feedback.map((item: any) => (
                            <div key={item.id} className="p-8 rounded-[2.5rem] bg-white/2 border border-white/5 flex flex-col group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <MessageSquare className="w-12 h-12 text-slate-800" />
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-green-500/10 text-green-400">
                                        {item.feedback_type}
                                    </span>
                                    <span className="text-[10px] text-slate-700 font-bold uppercase tracking-wider">
                                        {format(parseISO(item.created_at), 'MMM d, yyyy')}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed font-medium mb-8 flex-1 italic">
                                    &quot;{item.message}&quot;
                                </p>
                                <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-black text-[10px] text-slate-500 border border-white/10 uppercase">
                                        {(item.user_email || 'A')[0]}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-bold text-white truncate">{item.user_email || 'Anonymous Collector'}</p>
                                        <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Feedback Source</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </FadeIn>
                )}

                {activeTab === 'newsletter' && (
                    <FadeIn key="newsletter" className="max-w-2xl mx-auto space-y-6">
                        <div className="bg-white/2 border border-white/5 rounded-[2.5rem] overflow-hidden">
                            <div className="p-6 bg-white/2 border-b border-white/5 flex items-center justify-between">
                                <h3 className="text-xs font-black text-white uppercase tracking-widest">Active Subscribers</h3>
                                <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase">
                                    {subscribers.length} total
                                </span>
                            </div>
                            <div className="divide-y divide-white/2">
                                {subscribers.map((s: any) => (
                                    <div key={s.id} className="p-6 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex items-center justify-center">
                                                <Mail className="w-5 h-5 text-orange-500 opacity-50" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{s.email}</p>
                                                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Intercepted {format(parseISO(s.created_at), 'MMM d, yyyy')}</p>
                                            </div>
                                        </div>
                                        <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-600 hover:text-white transition-all">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                )}
            </div>
        </div>
    )
}
