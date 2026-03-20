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
    AlertCircle,
    X,
    ChevronLeft,
    Download,
    Eye
} from 'lucide-react'
import { 
    FadeIn, 
    StaggerContainer, 
    StaggerItem 
} from '@/components/ui/motion'
import { format, parseISO } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'

type Tab = 'overview' | 'users' | 'analyses' | 'subscriptions' | 'feedback' | 'newsletter'

const PAGE_SIZE = 10

export default function AdminClient() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<Tab>('overview')
    const [searchQuery, setSearchQuery] = useState('')
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)

    // Filter states
    const [userPlanFilter, setUserPlanFilter] = useState('all')
    const [analysisStatusFilter, setAnalysisStatusFilter] = useState('all')
    const [feedbackTypeFilter, setFeedbackTypeFilter] = useState('all')

    // Modal state
    const [selectedItem, setSelectedItem] = useState<any>(null)
    const [modalType, setModalType] = useState<Tab | null>(null)

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

    // Filtering Logic
    const filteredUsers = useMemo(() => {
        if (!data?.users) return []
        return data.users.filter((u: any) => {
            const matchesSearch = u.email.toLowerCase().includes(searchQuery.toLowerCase()) || (u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()))
            const matchesPlan = userPlanFilter === 'all' || u.plan === userPlanFilter
            return matchesSearch && matchesPlan
        })
    }, [data?.users, searchQuery, userPlanFilter])

    const filteredAnalyses = useMemo(() => {
        if (!data?.analyses) return []
        return data.analyses.filter((a: any) => {
            const matchesSearch = a.title?.toLowerCase().includes(searchQuery.toLowerCase()) || a.users?.email.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesStatus = analysisStatusFilter === 'all' || a.status === analysisStatusFilter
            return matchesSearch && matchesStatus
        })
    }, [data?.analyses, searchQuery, analysisStatusFilter])

    const filteredFeedback = useMemo(() => {
        if (!data?.feedback) return []
        return data.feedback.filter((f: any) => {
            const matchesSearch = f.user_email?.toLowerCase().includes(searchQuery.toLowerCase()) || f.message.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesType = feedbackTypeFilter === 'all' || f.feedback_type === feedbackTypeFilter
            return matchesSearch && matchesType
        })
    }, [data?.feedback, searchQuery, feedbackTypeFilter])

    const filteredSubscribers = useMemo(() => {
        if (!data?.subscribers) return []
        return data.subscribers.filter((s: any) => s.email.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [data?.subscribers, searchQuery])

    // Pagination Logic
    const paginatedData = useMemo(() => {
        const source = activeTab === 'users' ? filteredUsers :
                      activeTab === 'analyses' ? filteredAnalyses :
                      activeTab === 'feedback' ? filteredFeedback :
                      filteredSubscribers
        
        const start = (currentPage - 1) * PAGE_SIZE
        const end = start + PAGE_SIZE
        return {
            items: source.slice(start, end),
            total: source.length,
            totalPages: Math.ceil(source.length / PAGE_SIZE)
        }
    }, [activeTab, filteredUsers, filteredAnalyses, filteredFeedback, filteredSubscribers, currentPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [activeTab, searchQuery, userPlanFilter, analysisStatusFilter, feedbackTypeFilter])

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

    const { stats } = data

    const tabs: { id: Tab; label: string; icon: any }[] = [
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'analyses', label: 'Analyses', icon: BarChart3 },
        { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
        { id: 'feedback', label: 'Feedback', icon: MessageSquare },
        { id: 'newsletter', label: 'Newsletter', icon: Mail },
    ]

    const handleRowClick = (item: any, type: Tab) => {
        setSelectedItem(item)
        setModalType(type)
    }

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
            <div className="flex items-center gap-1 mb-6 p-1.5 rounded-2xl bg-white/2 border border-white/5 backdrop-blur-xl w-fit overflow-x-auto no-scrollbar max-w-full">
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

            {/* Content Filters & Actions */}
            {activeTab !== 'overview' && (
                <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                    <div className="flex-1 flex items-center gap-3 w-full bg-white/2 border border-white/5 rounded-2xl p-2.5 pl-4 hover:border-white/10 transition-colors">
                        <Search className="w-4 h-4 text-slate-500" />
                        <input 
                            type="text"
                            placeholder={`Search ${activeTab}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-slate-600 w-full"
                        />
                    </div>
                    
                    {activeTab === 'users' && (
                        <select 
                            value={userPlanFilter}
                            onChange={(e) => setUserPlanFilter(e.target.value)}
                            className="bg-white/2 border border-white/5 rounded-2xl px-4 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                        >
                            <option value="all">All Plans</option>
                            <option value="free">Free</option>
                            <option value="growth">Growth</option>
                        </select>
                    )}

                    {activeTab === 'analyses' && (
                        <select 
                            value={analysisStatusFilter}
                            onChange={(e) => setAnalysisStatusFilter(e.target.value)}
                            className="bg-white/2 border border-white/5 rounded-2xl px-4 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="processing">Processing</option>
                            <option value="failed">Failed</option>
                        </select>
                    )}

                    {activeTab === 'feedback' && (
                        <select 
                            value={feedbackTypeFilter}
                            onChange={(e) => setFeedbackTypeFilter(e.target.value)}
                            className="bg-white/2 border border-white/5 rounded-2xl px-4 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                        >
                            <option value="all">All Feedback</option>
                            <option value="bug">Bugs</option>
                            <option value="feature">Features</option>
                            <option value="general">General</option>
                        </select>
                    )}
                </div>
            )}

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
                                        <div key={a.id} 
                                            onClick={() => handleRowClick(a, 'analyses')}
                                            className="p-4 rounded-2xl bg-white/2 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10">
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
                                        <div key={u.id} 
                                            onClick={() => handleRowClick(u, 'users')}
                                            className="p-4 rounded-2xl bg-white/2 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center font-black text-[10px] text-slate-500 group-hover:bg-white/10">
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

                {(activeTab !== 'overview' && activeTab !== 'subscriptions') && (
                    <FadeIn key={activeTab} className="space-y-6">
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
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Action</th>
                                            </>
                                        ) : activeTab === 'analyses' ? (
                                            <>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Title</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">User</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Entries</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Date</th>
                                            </>
                                        ) : activeTab === 'feedback' ? (
                                            <>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Type</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">User</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Message</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Date</th>
                                            </>
                                        ) : (
                                            <>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Intercepted</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Email Address</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Source</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/2">
                                    {paginatedData.items.map((item: any) => (
                                        <tr key={item.id} 
                                            onClick={() => handleRowClick(item, activeTab)}
                                            className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                                            {activeTab === 'users' ? (
                                                <>
                                                    <td className="px-6 py-4">
                                                        <div className={`w-2 h-2 rounded-full ${item.subscription_status === 'active' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-slate-700'}`} />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-[11px] font-bold text-white">{item.email}</p>
                                                        <p className="text-[9px] text-slate-600 font-medium">{item.full_name || 'No full name'}</p>
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
                                                        <Eye className="w-3.5 h-3.5 text-slate-700 group-hover:text-indigo-400 transition-colors ml-auto" />
                                                    </td>
                                                </>
                                            ) : activeTab === 'analyses' ? (
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
                                                    <td className="px-6 py-4 text-right text-[10px] font-bold text-slate-600 uppercase">
                                                        {format(parseISO(item.created_at), 'MM/dd HH:mm')}
                                                    </td>
                                                </>
                                            ) : activeTab === 'feedback' ? (
                                                <>
                                                    <td className="px-6 py-4">
                                                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-green-500/5 text-green-400">
                                                            {item.feedback_type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 overflow-hidden max-w-[120px]">
                                                        <p className="text-[11px] font-bold text-slate-400 truncate">{item.user_email || 'Anonymous'}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-[11px] text-slate-500 truncate max-w-[300px] italic">"{item.message}"</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-[10px] font-bold text-slate-600 uppercase">
                                                        {format(parseISO(item.created_at), 'MMM d')}
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase">
                                                        {format(parseISO(item.created_at), 'MMM d, yyyy')}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-bold text-white">{item.email}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-700">Landing Page</span>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {paginatedData.items.length === 0 && (
                                <div className="py-24 text-center">
                                    <AlertCircle className="w-12 h-12 text-slate-800 mx-auto mb-4" />
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Null Intercept</h3>
                                    <p className="text-xs text-slate-600 font-bold uppercase tracking-[0.2em]">The matrix is empty for this query</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination Footer */}
                        {paginatedData.totalPages > 1 && (
                            <div className="flex items-center justify-between px-2 mt-8">
                                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                    Displaying {paginatedData.items.length} of {paginatedData.total} records
                                </p>
                                <div className="flex items-center gap-2">
                                    <button 
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(p => p - 1)}
                                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-500 disabled:opacity-20 hover:text-white transition-all">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <div className="flex items-center gap-1">
                                        {[...Array(paginatedData.totalPages)].map((_, i) => (
                                            <button 
                                                key={i}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`w-8 h-8 rounded-xl text-[10px] font-black transition-all ${
                                                    currentPage === i + 1 
                                                        ? 'bg-indigo-500 text-white shadow-lg' 
                                                        : 'bg-white/2 text-slate-600 hover:text-slate-400'
                                                }`}>
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <button 
                                        disabled={currentPage === paginatedData.totalPages}
                                        onClick={() => setCurrentPage(p => p + 1)}
                                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-500 disabled:opacity-20 hover:text-white transition-all">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
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
                                    <div key={u.id} className="p-5 rounded-3xl bg-white/2 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white/5 transition-colors cursor-pointer" onClick={() => handleRowClick(u, 'users')}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-black text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
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
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-2xl bg-[#0a0a0c] border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                        {modalType === 'users' ? <Users className="w-6 h-6 text-indigo-400" /> :
                                         modalType === 'analyses' ? <BarChart3 className="w-6 h-6 text-blue-400" /> :
                                         <MessageSquare className="w-6 h-6 text-green-400" />}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-white uppercase tracking-tight">Record Intelligence</h2>
                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Type: {modalType}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedItem(null)}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                                {modalType === 'users' && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-6 rounded-3xl bg-white/2 border border-white/5">
                                                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">Email Coordinates</p>
                                                <p className="text-white font-bold">{selectedItem.email}</p>
                                            </div>
                                            <div className="p-6 rounded-3xl bg-white/2 border border-white/5">
                                                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">Active Plan</p>
                                                <p className="text-indigo-400 font-bold uppercase tracking-wider">{selectedItem.plan}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">System Metadata</h3>
                                            <div className="divide-y divide-white/5 border border-white/5 rounded-3xl bg-white/2">
                                                <div className="p-4 flex justify-between">
                                                    <span className="text-xs text-indigo-300">Internal ID</span>
                                                    <span className="text-xs text-white font-mono">{selectedItem.id}</span>
                                                </div>
                                                <div className="p-4 flex justify-between">
                                                    <span className="text-xs text-indigo-300">Deployment Date</span>
                                                    <span className="text-xs text-white">{format(parseISO(selectedItem.created_at), 'MMMM d, yyyy HH:mm')}</span>
                                                </div>
                                                <div className="p-4 flex justify-between">
                                                    <span className="text-xs text-indigo-300">Subscription Status</span>
                                                    <span className={`text-xs font-bold uppercase ${selectedItem.subscription_status === 'active' ? 'text-green-400' : 'text-slate-600'}`}>
                                                        {selectedItem.subscription_status}
                                                    </span>
                                                </div>
                                                <div className="p-4 flex justify-between">
                                                    <span className="text-xs text-indigo-300">Analyses Processed</span>
                                                    <span className="text-xs text-white">{selectedItem.analyses_used_this_month}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalType === 'analyses' && (
                                    <div className="space-y-8">
                                        <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 text-center">
                                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3">Analysis Profile</h3>
                                            <p className="text-2xl font-black text-white tracking-tight mb-2 underline decoration-indigo-500/30 underline-offset-8">
                                                {selectedItem.title || 'Untitled Signal'}
                                            </p>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">{selectedItem.users?.email}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-5 rounded-3xl bg-white/2 border border-white/5 flex items-center justify-between">
                                                <div>
                                                    <p className="text-[9px] font-bold text-slate-600 uppercase mb-1">Status</p>
                                                    <p className="text-xs font-black text-white uppercase tracking-widest">{selectedItem.status}</p>
                                                </div>
                                                <AlertCircle className={`w-5 h-5 ${selectedItem.status === 'completed' ? 'text-green-500' : 'text-red-500'}`} />
                                            </div>
                                            <div className="p-5 rounded-3xl bg-white/2 border border-white/5 flex items-center justify-between">
                                                <div>
                                                    <p className="text-[9px] font-bold text-slate-600 uppercase mb-1">Vector Size</p>
                                                    <p className="text-xs font-black text-white uppercase tracking-widest">{selectedItem.total_entries} Rows</p>
                                                </div>
                                                <BarChart3 className="w-5 h-5 text-indigo-400" />
                                            </div>
                                        </div>
                                        <div className="flex justify-center pt-4">
                                            <a href={`/analysis/${selectedItem.id}`} target="_blank" className="flex items-center gap-3 px-8 py-3 rounded-full bg-indigo-500 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/30 hover:scale-105 transition-all">
                                                Inspect Result <ArrowRight className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {modalType === 'feedback' && (
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between px-2">
                                            <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-black uppercase tracking-widest">
                                                {selectedItem.feedback_type} Discovery
                                            </span>
                                            <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">
                                                Captured {format(parseISO(selectedItem.created_at), 'HH:mm')}
                                            </span>
                                        </div>
                                        <div className="p-8 rounded-[3rem] bg-white/2 border border-white/5 relative bg-gradient-to-br from-white/[0.03] to-transparent">
                                            <p className="text-sm text-slate-300 leading-relaxed font-medium italic relative z-10">
                                                &quot;{selectedItem.message}&quot;
                                            </p>
                                            <MessageSquare className="absolute -bottom-6 -right-6 w-32 h-32 text-white/[0.02] -rotate-12" />
                                        </div>
                                        <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center font-black text-indigo-400">
                                                {selectedItem.user_email?.[0].toUpperCase() || 'A'}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-white leading-none">{selectedItem.user_email || 'Anonymous Collector'}</p>
                                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1.5">Feedback Source Matrix</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-8 border-t border-white/5 bg-white/2 flex justify-end">
                                <button 
                                    onClick={() => setSelectedItem(null)}
                                    className="px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-black text-slate-400 uppercase tracking-widest transition-all">
                                    Close Intelligence
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
