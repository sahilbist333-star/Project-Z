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
    Filter as FilterIcon,
    CreditCard,
    Calendar,
    ChevronRight,
    UserCheck,
    AlertCircle,
    X,
    ChevronLeft,
    Download,
    Eye,
    RotateCcw
} from 'lucide-react'
import { 
    FadeIn, 
    StaggerContainer, 
    StaggerItem 
} from '@/components/ui/motion'
import { format, parseISO, isAfter, subDays, startOfDay } from 'date-fns'
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
    const [userStatusFilter, setUserStatusFilter] = useState('all')
    const [analysisStatusFilter, setAnalysisStatusFilter] = useState('all')
    const [analysisDateFilter, setAnalysisDateFilter] = useState('all')
    const [feedbackTypeFilter, setFeedbackTypeFilter] = useState('all')
    const [subscriptionPlanFilter, setSubscriptionPlanFilter] = useState('all')
    const [subscriptionStatusFilter, setSubscriptionStatusFilter] = useState('all')
    const [newsletterDateFilter, setNewsletterDateFilter] = useState('all')

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

    const clearFilters = () => {
        setSearchQuery('')
        setUserPlanFilter('all')
        setUserStatusFilter('all')
        setAnalysisStatusFilter('all')
        setAnalysisDateFilter('all')
        setFeedbackTypeFilter('all')
        setSubscriptionPlanFilter('all')
        setSubscriptionStatusFilter('all')
        setNewsletterDateFilter('all')
        setCurrentPage(1)
    }

    // Filtering Logic
    const filteredUsers = useMemo(() => {
        if (!data?.users) return []
        return data.users.filter((u: any) => {
            const matchesSearch = u.email.toLowerCase().includes(searchQuery.toLowerCase()) || (u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()))
            const matchesPlan = userPlanFilter === 'all' || u.plan === userPlanFilter
            const matchesStatus = userStatusFilter === 'all' || u.subscription_status === userStatusFilter
            return matchesSearch && matchesPlan && matchesStatus
        })
    }, [data?.users, searchQuery, userPlanFilter, userStatusFilter])

    const filteredAnalyses = useMemo(() => {
        if (!data?.analyses) return []
        const now = new Date()
        return data.analyses.filter((a: any) => {
            const matchesSearch = a.title?.toLowerCase().includes(searchQuery.toLowerCase()) || a.users?.email.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesStatus = analysisStatusFilter === 'all' || a.status === analysisStatusFilter
            
            let matchesDate = true
            const createdAt = parseISO(a.created_at)
            if (analysisDateFilter === 'today') matchesDate = isAfter(createdAt, startOfDay(now))
            else if (analysisDateFilter === '7d') matchesDate = isAfter(createdAt, subDays(now, 7))
            else if (analysisDateFilter === '30d') matchesDate = isAfter(createdAt, subDays(now, 30))
            
            return matchesSearch && matchesStatus && matchesDate
        })
    }, [data?.analyses, searchQuery, analysisStatusFilter, analysisDateFilter])

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
        const now = new Date()
        return data.subscribers.filter((s: any) => {
            const matchesSearch = s.email.toLowerCase().includes(searchQuery.toLowerCase())
            
            let matchesDate = true
            const createdAt = parseISO(s.created_at)
            if (newsletterDateFilter === 'today') matchesDate = isAfter(createdAt, startOfDay(now))
            else if (newsletterDateFilter === '7d') matchesDate = isAfter(createdAt, subDays(now, 7))
            else if (newsletterDateFilter === '30d') matchesDate = isAfter(createdAt, subDays(now, 30))
            
            return matchesSearch && matchesDate
        })
    }, [data?.subscribers, searchQuery, newsletterDateFilter])

    const filteredSubscriptions = useMemo(() => {
        if (!data?.users) return []
        return data.users.filter((u: any) => {
            if (!u.subscription_id && subscriptionPlanFilter !== 'free' && subscriptionPlanFilter !== 'all') return false
            const matchesSearch = u.email.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesPlan = subscriptionPlanFilter === 'all' || u.plan === subscriptionPlanFilter
            const matchesStatus = subscriptionStatusFilter === 'all' || u.subscription_status === subscriptionStatusFilter
            return matchesSearch && matchesPlan && matchesStatus
        })
    }, [data?.users, searchQuery, subscriptionPlanFilter, subscriptionStatusFilter])

    // Pagination Logic
    const paginatedData = useMemo(() => {
        const source = activeTab === 'users' ? filteredUsers :
                      activeTab === 'analyses' ? filteredAnalyses :
                      activeTab === 'feedback' ? filteredFeedback :
                      activeTab === 'subscriptions' ? filteredSubscriptions :
                      activeTab === 'newsletter' ? filteredSubscribers :
                      filteredSubscribers
        
        const start = (currentPage - 1) * PAGE_SIZE
        const end = start + PAGE_SIZE
        return {
            items: source.slice(start, end),
            total: source.length,
            totalPages: Math.ceil(source.length / PAGE_SIZE)
        }
    }, [activeTab, filteredUsers, filteredAnalyses, filteredFeedback, filteredSubscribers, filteredSubscriptions, currentPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [activeTab, searchQuery, userPlanFilter, userStatusFilter, analysisStatusFilter, analysisDateFilter, feedbackTypeFilter, subscriptionPlanFilter, subscriptionStatusFilter, newsletterDateFilter])

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
        <div className="p-8 max-w-7xl mx-auto relative z-10 pb-20 min-h-screen font-sans">
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
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={clearFilters}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset All Filters
                    </button>
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
                <div className="flex flex-col md:flex-row items-center gap-3 mb-6 bg-white/2 border border-white/5 rounded-[2rem] p-3 backdrop-blur-sm">
                    <div className="flex-1 flex items-center gap-3 w-full bg-black/20 border border-white/5 rounded-xl p-2.5 pl-4 focus-within:border-indigo-500/50 transition-colors">
                        <Search className="w-4 h-4 text-slate-500" />
                        <input 
                            type="text"
                            placeholder={`Search records by email or content...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-[11px] font-bold text-white placeholder-slate-600 w-full uppercase tracking-wider"
                        />
                    </div>
                    
                    {activeTab === 'users' && (
                        <>
                            <select 
                                value={userPlanFilter}
                                onChange={(e) => setUserPlanFilter(e.target.value)}
                                className="bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer w-full md:w-auto"
                            >
                                <option value="all">Plan: All</option>
                                <option value="free">Free</option>
                                <option value="growth">Growth</option>
                            </select>
                            <select 
                                value={userStatusFilter}
                                onChange={(e) => setUserStatusFilter(e.target.value)}
                                className="bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer w-full md:w-auto"
                            >
                                <option value="all">Status: All</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </>
                    )}

                    {activeTab === 'analyses' && (
                        <>
                            <select 
                                value={analysisStatusFilter}
                                onChange={(e) => setAnalysisStatusFilter(e.target.value)}
                                className="bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer w-full md:w-auto"
                            >
                                <option value="all">Status: All</option>
                                <option value="completed">Completed</option>
                                <option value="processing">Processing</option>
                                <option value="failed">Failed</option>
                            </select>
                            <select 
                                value={analysisDateFilter}
                                onChange={(e) => setAnalysisDateFilter(e.target.value)}
                                className="bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer w-full md:w-auto"
                            >
                                <option value="all">Time: All Time</option>
                                <option value="today">Today</option>
                                <option value="7d">Last 7 Days</option>
                                <option value="30d">Last 30 Days</option>
                            </select>
                        </>
                    )}

                    {activeTab === 'subscriptions' && (
                        <>
                            <select 
                                value={subscriptionPlanFilter}
                                onChange={(e) => setSubscriptionPlanFilter(e.target.value)}
                                className="bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer w-full md:w-auto"
                            >
                                <option value="all">Plan: All Tiers</option>
                                <option value="free">Free Pipeline</option>
                                <option value="growth">Growth Paid</option>
                            </select>
                            <select 
                                value={subscriptionStatusFilter}
                                onChange={(e) => setSubscriptionStatusFilter(e.target.value)}
                                className="bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer w-full md:w-auto"
                            >
                                <option value="all">Status: All</option>
                                <option value="active">Active Subs</option>
                                <option value="inactive">Churned/Free</option>
                            </select>
                        </>
                    )}

                    {activeTab === 'feedback' && (
                        <select 
                            value={feedbackTypeFilter}
                            onChange={(e) => setFeedbackTypeFilter(e.target.value)}
                            className="bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer w-full md:w-auto"
                        >
                            <option value="all">Type: All Messages</option>
                            <option value="bug">Bug Reports</option>
                            <option value="feature">Feature Requests</option>
                            <option value="general">General Signals</option>
                        </select>
                    )}

                    {activeTab === 'newsletter' && (
                        <select 
                            value={newsletterDateFilter}
                            onChange={(e) => setNewsletterDateFilter(e.target.value)}
                            className="bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer w-full md:w-auto"
                        >
                            <option value="all">Time: All Time</option>
                            <option value="today">Today</option>
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
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
                                <div key={stat.label} className="p-6 rounded-[2rem] bg-white/2 border border-white/5 group hover:border-white/10 transition-all cursor-default">
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

                {activeTab !== 'overview' && (
                    <FadeIn key={activeTab} className="space-y-6">
                        <div className="bg-white/2 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-white/2 border-b border-white/5">
                                    <tr>
                                        {activeTab === 'users' ? (
                                            <>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Email Coordinates</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Plan Tier</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Joined Date</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Action</th>
                                            </>
                                        ) : activeTab === 'analyses' ? (
                                            <>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Signal Title</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Source User</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Vector Size</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Captured</th>
                                            </>
                                        ) : activeTab === 'subscriptions' ? (
                                            <>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Tier</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Account</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Protocol ID</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Interval</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Health</th>
                                            </>
                                        ) : activeTab === 'feedback' ? (
                                            <>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Category</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Reporter</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Message Content</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Intercepted</th>
                                            </>
                                        ) : (
                                            <>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Registry Date</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Email Intercept</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Ingress</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/2">
                                    {paginatedData.items.map((item: any) => (
                                        <tr key={item.id} 
                                            onClick={() => handleRowClick(item, activeTab === 'subscriptions' ? 'users' : activeTab)}
                                            className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                                            {activeTab === 'users' ? (
                                                <>
                                                    <td className="px-6 py-4">
                                                        <div className={`w-2 h-2 rounded-full ${item.subscription_status === 'active' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-slate-700'}`} />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-[11px] font-bold text-white uppercase tracking-tight">{item.email}</p>
                                                        <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mt-0.5">{item.full_name || 'Anonymous'}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${item.plan === 'growth' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/5 text-slate-500'}`}>
                                                            {item.plan}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                                                        {format(parseISO(item.created_at), 'MMM d, yyyy')}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 transition-all ml-auto">
                                                            <Eye className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                                                        </div>
                                                    </td>
                                                </>
                                            ) : activeTab === 'analyses' ? (
                                                <>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                                            item.status === 'completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                            item.status === 'failed' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                                        }`}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-[11px] font-bold text-white truncate max-w-[200px] uppercase tracking-tight">{item.title || 'Untitled Signal'}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-[10px] font-bold text-slate-500 truncate max-w-[150px] uppercase tracking-wider">{item.users?.email}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                        {item.total_entries || 0} Entries
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                                        {format(parseISO(item.created_at), 'MM/dd HH:mm')}
                                                    </td>
                                                </>
                                            ) : activeTab === 'subscriptions' ? (
                                                <>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${item.plan === 'growth' ? 'bg-purple-500/10 text-purple-400' : 'bg-white/5 text-slate-500'}`}>
                                                            {item.plan}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-[11px] font-bold text-white uppercase tracking-tight">{item.email}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-[9px] text-slate-600 font-mono uppercase tracking-widest">{item.subscription_id || 'LOCAL-ALPHA-01'}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                        {item.billing_interval || 'ON-DEMAND'}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full inline-block ${
                                                            item.subscription_status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                                        }`}>
                                                            {item.subscription_status}
                                                        </div>
                                                    </td>
                                                </>
                                            ) : activeTab === 'feedback' ? (
                                                <>
                                                    <td className="px-6 py-4">
                                                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-green-500/5 text-green-400 border border-green-500/10">
                                                            {item.feedback_type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 overflow-hidden max-w-[120px]">
                                                        <p className="text-[11px] font-bold text-slate-400 truncate uppercase tracking-tight">{item.user_email || 'Anonymous'}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-[11px] text-slate-500 truncate max-w-[300px] italic">"{item.message}"</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                                        {format(parseISO(item.created_at), 'MMM d, HH:mm')}
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="px-6 py-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                                        {format(parseISO(item.created_at), 'MMM d, yyyy')}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-bold text-white uppercase tracking-tight">{item.email}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-700">Intercept_Alpha</span>
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
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Zero Result Captured</h3>
                                    <p className="text-xs text-slate-600 font-bold uppercase tracking-[0.2em]">Adjust coordinates or reset search</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination Footer */}
                        <div className="flex items-center justify-between px-2 mt-8">
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                                DISPLAYING {paginatedData.items.length} / {paginatedData.total} SIGNALS
                            </p>
                            {paginatedData.totalPages > 1 && (
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
                            )}
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
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-2xl bg-[#0a0a0c] border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                        {modalType === 'users' ? <Users className="w-6 h-6 text-indigo-400" /> :
                                         modalType === 'analyses' ? <BarChart3 className="w-6 h-6 text-blue-400" /> :
                                         <MessageSquare className="w-6 h-6 text-green-400" />}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-white uppercase tracking-tight">Intercept Intelligence</h2>
                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Protocol Type: {modalType?.toUpperCase()}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedItem(null)}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors group">
                                    <X className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-gradient-to-b from-transparent to-white/[0.01]">
                                {modalType === 'users' && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-6 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm group hover:border-indigo-500/30 transition-all">
                                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Alpha coordinates</p>
                                                <p className="text-white font-black text-sm uppercase tracking-tight">{selectedItem.email}</p>
                                            </div>
                                            <div className="p-6 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm group hover:border-purple-500/30 transition-all">
                                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Service Status</p>
                                                <p className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
                                                    <span className={selectedItem.plan === 'growth' ? 'text-purple-400' : 'text-slate-500 opacity-60'}>{selectedItem.plan}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                                                    <span className={selectedItem.subscription_status === 'active' ? 'text-green-400' : 'text-red-500'}>{selectedItem.subscription_status}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Core Registry Metadata</h3>
                                            <div className="divide-y divide-white/2 border border-white/5 rounded-[2.5rem] bg-black/40 overflow-hidden">
                                                {[
                                                    { label: 'Network ID', value: selectedItem.id, mono: true },
                                                    { label: 'Genesis Timestamp', value: format(parseISO(selectedItem.created_at), 'MMMM d, yyyy HH:mm') },
                                                    { label: 'Signal Vector Count', value: selectedItem.total_analyses || 0 },
                                                    { label: 'Last Intercept', value: format(parseISO(selectedItem.last_sign_in_at || selectedItem.created_at), 'MMM d, HH:mm') }
                                                ].map((row) => (
                                                    <div key={row.label} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-white/[0.02] transition-colors">
                                                        <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">{row.label}</span>
                                                        <span className={`text-xs text-white font-bold ${row.mono ? 'font-mono opacity-60' : ''}`}>{row.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalType === 'analyses' && (
                                    <div className="space-y-8">
                                        <div className="p-10 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/10 text-center relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 relative z-10">Signal Identifier</h3>
                                            <p className="text-3xl font-black text-white tracking-tighter mb-3 relative z-10 uppercase">
                                                {selectedItem.title || 'NULL_SIGNAL'}
                                            </p>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] relative z-10 opacity-60">{selectedItem.users?.email}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-6 rounded-3xl bg-white/2 border border-white/5 flex items-center justify-between group hover:border-green-500/30 transition-all">
                                                <div>
                                                    <p className="text-[9px] font-black text-slate-600 uppercase mb-2 tracking-widest">Operation Status</p>
                                                    <p className="text-xs font-black text-white uppercase tracking-[0.2em]">{selectedItem.status}</p>
                                                </div>
                                                <TrendingUp className={`w-5 h-5 ${selectedItem.status === 'completed' ? 'text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'text-yellow-500'}`} />
                                            </div>
                                            <div className="p-6 rounded-3xl bg-white/2 border border-white/5 flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                                                <div>
                                                    <p className="text-[9px] font-black text-slate-600 uppercase mb-2 tracking-widest">Complexity Index</p>
                                                    <p className="text-xs font-black text-white uppercase tracking-[0.2em]">{selectedItem.total_entries} Data-Points</p>
                                                </div>
                                                <BarChart3 className="w-5 h-5 text-indigo-400" />
                                            </div>
                                        </div>
                                        <div className="flex justify-center pt-4">
                                            <a href={`/analysis/${selectedItem.id}`} target="_blank" className="flex items-center gap-3 px-10 py-4 rounded-full bg-indigo-500 text-white text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all w-full md:w-auto justify-center">
                                                Decipher Result <ArrowRight className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {modalType === 'feedback' && (
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between px-2">
                                            <span className="px-5 py-2 rounded-xl bg-green-500/10 text-green-400 text-[10px] font-black uppercase tracking-widest border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                                                {selectedItem.feedback_type} INTERCEPT
                                            </span>
                                            <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest opacity-60">
                                                RECORDED {format(parseISO(selectedItem.created_at), 'MMM d, HH:mm')}
                                            </span>
                                        </div>
                                        <div className="p-10 rounded-[3.5rem] bg-white/2 border border-white/5 relative group overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-50" />
                                            <p className="text-base text-slate-200 leading-relaxed font-medium italic relative z-10 tracking-tight">
                                                &quot;{selectedItem.message}&quot;
                                            </p>
                                            <MessageSquare className="absolute -bottom-10 -right-10 w-48 h-48 text-white/[0.01] -rotate-12 transition-transform group-hover:rotate-0 duration-700" />
                                        </div>
                                        <div className="p-6 rounded-[2rem] bg-black/40 border border-white/5 flex items-center gap-5 hover:border-indigo-500/20 transition-all">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center font-black text-indigo-400 border border-indigo-500/20 text-lg">
                                                {selectedItem.user_email?.[0].toUpperCase() || 'A'}
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-black text-white leading-none uppercase tracking-tight">{selectedItem.user_email || 'SECURE_ANONYMOUS'}</p>
                                                <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mt-2 opacity-60 italic">Signal Transmission Source</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-10 border-t border-white/5 bg-black flex justify-end">
                                <button 
                                    onClick={() => setSelectedItem(null)}
                                    className="px-10 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-[0.3em] transition-all border border-white/5">
                                    Release Intercept
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}
