import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, User, Book, MessageSquare, Clock, Users, Award, X } from 'lucide-react';
import Navbar from '../../components/res/Navbar';

const staffMembers = [
    { id: 1, name: "John Doe", department: "Computer Science", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Will Smith", department: "Mathematics", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Sam Johnson", department: "Physics", image: "/placeholder.svg?height=100&width=100" },
];

const ratingCriteria = [
    { id: 'communication', name: 'Communication', icon: MessageSquare },
    { id: 'syllabus', name: 'Syllabus Completion', icon: Book },
    { id: 'punctuality', name: 'Punctuality', icon: Clock },
    { id: 'fairness', name: 'Fairness & Equality', icon: Users },
    { id: 'expertise', name: 'Subject Expertise', icon: Award },
];

const RatingModal = ({ isOpen, onClose, staff }) => {
    const [ratings, setRatings] = useState({});
    const [comment, setComment] = useState('');

    const handleRating = (criteriaId, rating) => {
        setRatings(prev => ({ ...prev, [criteriaId]: rating }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted ratings for', staff.name, ':', ratings, 'Comment:', comment);
        // Reset form after submission
        setRatings({});
        setComment('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl m-4 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-900">Rate {staff.name}</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
                                <X className="w-8 h-8" />
                            </button>
                        </div>
                        <div className="flex items-center space-x-4 mb-6">
                            <img src={staff.image} alt={staff.name} className="w-20 h-20 rounded-full object-cover" />
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-800">{staff.name}</h3>
                                <p className="text-lg text-gray-600">{staff.department}</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {ratingCriteria.map((criteria) => (
                                    <div key={criteria.id} className="bg-gray-50 p-4 rounded-lg">
                                        <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                                            <criteria.icon className="w-6 h-6 mr-2 text-indigo-500" />
                                            {criteria.name}
                                        </label>
                                        <div className="flex space-x-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <motion.button
                                                    key={star}
                                                    type="button"
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleRating(criteria.id, star)}
                                                    className={`focus:outline-none ${(ratings[criteria.id] || 0) >= star ? 'text-yellow-400' : 'text-gray-300'
                                                        }`}
                                                >
                                                    <Star className="w-8 h-8 fill-current" />
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <label htmlFor={`comment-${staff.id}`} className="block text-lg font-medium text-gray-700 mb-2">
                                    Additional Comments <span className='text-[#a1a1a1]'>( Optional )</span>
                                </label>
                                <textarea
                                    id={`comment-${staff.id}`}
                                    rows={4}
                                    className="shadow-sm focus:ring-indigo-500 px-4 py-4 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Share your thoughts about this staff member..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </div>
                            <motion.button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center text-lg font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Submit Rating
                                <Send className="ml-2 w-5 h-5" />
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const StaffCard = ({ staff, onRate }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
            <div className="p-6">
                <div className="flex items-center space-x-4">
                    <img src={staff.image} alt={staff.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">{staff.name}</h3>
                        <p className="text-gray-600">{staff.department}</p>
                    </div>
                </div>
                <motion.button
                    onClick={() => onRate(staff)}
                    className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Rate This Staff
                </motion.button>
            </div>
        </motion.div>
    );
};

export default function StaffRatingPage() {
    const [selectedStaff, setSelectedStaff] = useState(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
           {/* navbar  */}
           <Navbar/>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Rate Your Instructors</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Your feedback helps us improve the quality of education. Rate your instructors based on their teaching skills, communication, and overall performance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {staffMembers.map((staff) => (
                        <StaffCard key={staff.id} staff={staff} onRate={setSelectedStaff} />
                    ))}
                </div>

                <RatingModal
                    isOpen={!!selectedStaff}
                    onClose={() => setSelectedStaff(null)}
                    staff={selectedStaff || {}}
                />

                <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Your Ratings Matter</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                    <User className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-medium text-gray-900">Personalized Learning</h4>
                                <p className="mt-2 text-base text-gray-500">
                                    Your ratings help instructors tailor their teaching methods to better suit student needs.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-medium text-gray-900">Open Communication</h4>
                                <p className="mt-2 text-base text-gray-500">
                                    Ratings foster a culture of open feedback between students and faculty.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                    <Award className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-medium text-gray-900">Continuous Improvement</h4>
                                <p className="mt-2 text-base text-gray-500">
                                    Your feedback drives continuous improvement in teaching quality and course content.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="flex justify-center space-x-6 md:order-2">

                    </div>
                    <div className="mt-8 md:mt-0 md:order-1">
                        <p className="text-center text-base text-gray-400">
                            &copy; 2024 CampusVoices, Inc. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}