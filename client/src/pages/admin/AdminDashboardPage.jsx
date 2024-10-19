import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, UserPlus, Star, Users, BarChart2, PieChart, Bell, Settings, Menu, X, ChevronDown, ChevronUp, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import AdminSidebar from '../../components/res/AdminSidebar';
import customFetch from '../../utils/CustomFetch';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export const loader = async () => {
    try {
        const data = await customFetch.get('/dashboard-student/current-user');
        return data;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            toast.error("Please Login !!")
            return redirect('/login-admin')
        } else {
            toast.error("Please Login !!")
            return redirect('/')
        }
    }
}


const StatCard = ({ icon: Icon, label, value, change }) => (
    <div className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-10"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <h3 className="text-2xl font-bold mt-1">{value}</h3>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
                <Icon className="h-6 w-6 text-purple-600" />
            </div>
        </div>
        <div className="flex items-center relative z-10">
            <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                {change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
        </div>
    </div>
);

const FeedbackItem = ({ id, content, time, status, rating }) => (
    <motion.li
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white p-4 rounded-lg shadow-md relative overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-5"></div>
        <div className="flex justify-between items-start relative z-10">
            <div>
                <p className="font-semibold">Feedback #{id}</p>
                <p className="text-sm text-gray-500">{content}</p>
                <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                </div>
            </div>
            <div className="text-right">
                <span className="text-xs text-gray-400">{time}</span>
                <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${status === 'New' ? 'bg-green-100 text-green-800' :
                        status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                    }`}>
                    {status}
                </span>
            </div>
        </div>
    </motion.li>
);

export default function AdminDashboardPage() {
    const [activeSection, setActiveSection] = useState('Dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);

    // Mock data for charts (same as before)
    const monthlyFeedbackData = [
        { name: 'Jan', total: 120 },
        { name: 'Feb', total: 150 },
        { name: 'Mar', total: 180 },
        { name: 'Apr', total: 220 },
        { name: 'May', total: 250 },
        { name: 'Jun', total: 280 },
    ];

    const feedbackTypeData = [
        { name: 'Academic', value: 40 },
        { name: 'Facilities', value: 30 },
        { name: 'Staff', value: 20 },
        { name: 'Other', value: 10 },
    ];

    const recentFeedbacks = [
        { id: 1, content: "The new library hours are great!", time: "2h ago", status: "New", rating: 5 },
        { id: 2, content: "Can we have more vegan options in the cafeteria?", time: "4h ago", status: "In Progress", rating: 3 },
        { id: 3, content: "The Wi-Fi in the dorms needs improvement.", time: "1d ago", status: "Resolved", rating: 2 },
    ];

    const staffPerformanceData = [
        { name: 'Prof. Smith', rating: 4.8, feedbacks: 120 },
        { name: 'Dr. Johnson', rating: 4.5, feedbacks: 95 },
        { name: 'Ms. Williams', rating: 4.2, feedbacks: 80 },
        { name: 'Mr. Brown', rating: 4.0, feedbacks: 75 },
        { name: 'Dr. Davis', rating: 3.9, feedbacks: 60 },
    ];

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const toggleCardExpansion = (cardName) => {
        setExpandedCard(expandedCard === cardName ? null : cardName);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar/>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <button className="mr-4 md:hidden" onClick={toggleSidebar}>
                                <Menu className="h-6 w-6" />
                            </button>
                            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                                {activeSection}
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                <Bell className="h-5 w-5 text-gray-600" />
                            </button>
                            <div className="relative">
                                <button className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                                    <span className="text-sm font-medium text-white">HOD</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard icon={MessageSquare} label="Total Feedbacks" value="1,234" change={5.2} />
                            <StatCard icon={Users} label="Total Staff" value="56" change={2.1} />
                            <StatCard icon={Star} label="Average Rating" value="4.7" change={-0.3} />
                            <StatCard icon={UserPlus} label="New Users" value="28" change={12.5} />
                        </div>

                        {/* Feedback Trend Chart */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Feedback Trend</h3>
                                <button onClick={() => toggleCardExpansion('feedbackTrend')}>
                                    {expandedCard === 'feedbackTrend' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </button>
                            </div>
                            <AnimatePresence>
                                {(expandedCard === 'feedbackTrend' || expandedCard === null) && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center"
                                    >
                                        <p className="text-gray-500">Area Chart Placeholder</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Feedback Distribution and Recent Feedbacks */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Feedback Distribution</h3>
                                    <button onClick={() => toggleCardExpansion('feedbackDistribution')}>
                                        {expandedCard === 'feedbackDistribution' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {(expandedCard === 'feedbackDistribution' || expandedCard === null) && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center"
                                        >
                                            <p className="text-gray-500">Donut Chart Placeholder</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Recent Feedbacks</h3>
                                    <button onClick={() => toggleCardExpansion('recentFeedbacks')}>
                                        {expandedCard === 'recentFeedbacks' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {(expandedCard === 'recentFeedbacks' || expandedCard === null) && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            <ul className="space-y-4">
                                                {recentFeedbacks.map((feedback) => (
                                                    <FeedbackItem key={feedback.id} {...feedback} />
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Staff Performance */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Staff Performance</h3>
                                <button onClick={() => toggleCardExpansion('staffPerformance')}>
                                    {expandedCard === 'staffPerformance' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </button>
                            </div>
                            <AnimatePresence>
                                {(expandedCard === 'staffPerformance' || expandedCard === null) && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <div className="flex space-x-2 mb-4">
                                            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">Rating</button>
                                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">Feedbacks</button>
                                        </div>
                                        <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                                            <p className="text-gray-500">Bar Chart Placeholder</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center">
                                    <MessageSquare className="mr-2 h-4 w-4" /> View All Feedbacks
                                </button>
                                <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center">
                                    <UserPlus className="mr-2 h-4 w-4" /> Add New Staff
                                </button>
                                <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center">
                                    <Zap className="mr-2 h-4 w-4" /> Generate Report
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}