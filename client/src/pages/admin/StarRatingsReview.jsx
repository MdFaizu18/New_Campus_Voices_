import React, { useEffect, useState } from 'react'
import {
    Users,
    Star,
    BarChart2,
    ChevronRight,
    X,
    Home,
    User,
    Trash2,
    LogOut,
    Menu,
    Bell,
    Mail,
    Phone,
    Award,
    Clock,
    Hash
} from 'lucide-react'
import AdminSidebar from '../../components/res/AdminSidebar'
import customFetch from '../../utils/CustomFetch'
import { toast } from 'react-toastify'

// Mock data for staff members
const staffMembers = [
    { id: 1, name: "Anusuya C", department: "CSE", position: "Assistant Professor", rating: 3.0, totalRatings: 50, experience: 3, staffCode: "3210015", contact: "9445582790", email: "anusuyac@mahendratech.org", ratings: { teaching: 3.2, collaborative: 2.8, syllabusCompletion: 2.9 } },
    { id: 2, name: "Brindha C", department: "CSE", position: "Associate Professor", rating: 3.5, totalRatings: 65, experience: 5, staffCode: "3210016", contact: "9445582791", email: "brindhac@mahendratech.org", ratings: { teaching: 3.5, collaborative: 3.3, syllabusCompletion: 3.7 } },
    { id: 3, name: "Divya Bharathi M", department: "CSE", position: "Professor", rating: 4.2, totalRatings: 80, experience: 8, staffCode: "3210017", contact: "9445582792", email: "divyabharathim@mahendratech.org", ratings: { teaching: 4.5, collaborative: 4.0, syllabusCompletion: 4.1 } },
    { id: 4, name: "Gayathri A", department: "CSE", position: "Lecturer", rating: 3.8, totalRatings: 45, experience: 2, staffCode: "3210018", contact: "9445582793", email: "gayathria@mahendratech.org", ratings: { teaching: 4.0, collaborative: 3.5, syllabusCompletion: 3.9 } },
    { id: 5, name: "Jayasudha S", department: "CSE", position: "Professor", rating: 4.5, totalRatings: 90, experience: 10, staffCode: "3210019", contact: "9445582794", email: "jayasudhas@mahendratech.org", ratings: { teaching: 4.7, collaborative: 4.3, syllabusCompletion: 4.5 } },
]


const StaffRatingsReview = () => {
    const [selectedStaff, setSelectedStaff] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [departRatings,setDepartRatings] = useState({})
    const [modalType, setModalType] = useState(null) // Added modalType state

    useEffect(() => {
        const departmentRatings = async () => {
            try {
                const response = await customFetch.get("/depart-ratings");
                // Assuming the response contains an array of features
                setDepartRatings(response.data); // Adjust 'response.data' based on your API structure
            } catch (error) {
                console.error("Failed to fetch user data", error);
                toast.error("Failed to load features.");
            }
        };
        departmentRatings();
    }, []);

    console.log(departRatings)
   


    const handleDelete = (id) => {
        // Filter out the comment with the given id
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
    };

    // Mock data for comments
    const [comments, setComments] = useState([
        { id: 1, staffId: 1, studentName: "John Doe", date: "2023-05-15", comment: "Great teaching style!", rating: 4.5 },
        { id: 2, staffId: 1, studentName: "Jane Smith", date: "2023-05-16", comment: "Very helpful and patient.", rating: 5 },
        { id: 3, staffId: 1, studentName: "Alice Johnson", date: "2023-05-14", comment: "Explains complex topics well.", rating: 4 },
        { id: 4, staffId: 1, studentName: "Alice Johnson", date: "2023-05-14", comment: "Explains complex topics well.", rating: 4 },
        { id: 5, staffId: 1, studentName: "Alice Johnson", date: "2023-05-14", comment: "Explains complex topics well.", rating: 4 },
        { id: 6, staffId: 6, studentName: "Alice Johnson", date: "2023-05-14", comment: "Explains complex topics well.", rating: 4 },
        { id: 7, staffId: 7, studentName: "Alice Johnson", date: "2023-05-14", comment: "Explains complex topics well.", rating: 4 },
        // Add more mock comments as needed
    ])

    const totalStaff = staffMembers.length
    const totalReviews = staffMembers.reduce((sum, staff) => sum + staff.totalRatings, 0)
    const overallRating = departRatings.totalRatingsCount
        ? (departRatings.totalRating / departRatings.totalRatingsCount).toFixed(1)
        : "0.0";


    const topStaff = [...staffMembers].sort((a, b) => b.rating - a.rating).slice(0, 5)

    const openModal = (staff, type) => { // Modified openModal function
        setSelectedStaff(staff)
        setIsModalOpen(true)
        setModalType(type) // Added setModalType
    }

    const closeModal = () => {
        setSelectedStaff(null)
        setIsModalOpen(false)
        setModalType(null) // Reset modalType on close
    }

    const StarRating = ({ rating }) => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                    />
                ))}
            </div>
        )
    }

    const getRatingColor = (rating) => {
        if (rating >= 4) return 'bg-green-500'
        if (rating >= 3) return 'bg-yellow-500'
        return 'bg-red-500'
    }

    return (
        <div className="flex h-screen bg-gradient-to-br from-purple-100 to-pink-100">
            {/* Sidebar */}
            <AdminSidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <button className="mr-4 md:hidden">
                                <Menu className="h-6 w-6 text-gray-600" />
                            </button>
                            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                                Staff Analytics
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

                {/* Main content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Breadcrumbs */}
                        {/* Top rated staff */}
                        <div className="bg-white rounded-lg shadow-xl p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top Rated Staff</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {topStaff.map((staff, index) => (
                                    <div key={staff.id} className="bg-purple-50 rounded-lg p-4 shadow flex items-center space-x-4">
                                        <div className="flex-shrink-0 h-12 w-12">
                                            <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center">
                                                <span className="text-xl font-medium text-white">{staff.name[0]}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-lg">{staff.name}</div>
                                            {/* <div className="text-gray-600">{staff.department}</div> */}
                                            <div className="flex items-center mt-1">
                                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                                <span>{staff.rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Stat cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm uppercase text-gray-600">Total Staff</p>
                                        <h3 className="text-3xl font-bold text-purple-600">{totalStaff}</h3>
                                    </div>
                                    <Users className="h-10 w-10 text-purple-500 opacity-75" />
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm uppercase text-gray-600">Total Reviews</p>
                                        <h3 className="text-3xl font-bold text-pink-600">{totalReviews}</h3>
                                    </div>
                                    <BarChart2 className="h-10 w-10 text-pink-500 opacity-75" />
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm uppercase text-gray-600">Department Rating</p>
                                        <h3 className="text-3xl font-bold text-purple-600">
                                            {overallRating}
                                            <span className="text-sm font-medium text-gray-400">
                                                {" "}
                                               ( Avg of {departRatings.totalRatingsCount} members )
                                            </span>
                                        </h3>
                                    </div>
                                    <Star className="h-10 w-10 text-yellow-400 opacity-75" />
                                </div>
                            </div>

                        </div>






                        {/* Staff ratings list */}
                        <div className="bg-white rounded-lg shadow-xl p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Staff Ratings</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {staffMembers.map((staff) => (
                                            <tr key={staff.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                                <span className="text-xl font-medium text-purple-600">{staff.name[0]}</span>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                                                            <div className="text-sm text-gray-500">{staff.department}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StarRating rating={staff.rating} />

                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => openModal(staff, 'comments')} // Added 'comments' type
                                                        className="text-purple-600 hover:text-purple-900"
                                                    >
                                                        View Comments
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => openModal(staff, 'details')} // Added type 'details'
                                                        className="text-purple-600 hover:text-purple-900 mr-2"
                                                    >
                                                        View Details
                                                    </button>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-xl p-6">
                            <h1 className="text-3xl font-bold text-gray-800">Staff Performance Overview</h1>
                            <p className="text-gray-600 mt-2">Monitor and analyze staff ratings and feedback</p>
                        </div>

                    </div>
                </main>

                {/* Enhanced Modal */}
                {isModalOpen && selectedStaff && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden">
                            <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                                <button onClick={closeModal} className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors">
                                    <X className="h-6 w-6" />
                                </button>
                                <h2 className="text-3xl font-bold mb-2">{selectedStaff.name}</h2>
                                <p className="text-xl">{modalType === 'comments' ? 'Comments' : selectedStaff.position}</p>
                            </div>
                            {modalType === 'comments' ? (
                                <div className="p-6 max-h-[70vh] overflow-y-auto">
                                    {comments.filter(comment => comment.staffId === selectedStaff.id).map(comment => (
                                        <div key={comment.id} className="bg-gray-50 rounded-lg p-4 mb-4 shadow">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-semibold text-purple-600">{comment.studentName}</span>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    <span className="text-sm text-gray-500">{comment.date}</span>
                                                    <button
                                                        // className="text-red-500 text-sm mt-2 hover:underline"
                                                        className="flex items-center space-x-2   text-red-400 px-4 py-2 rounded transition-colors"

                                                        onClick={() => handleDelete(comment.id)}
                                                    >
                                                        <Trash2 />
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 mb-2">{comment.comment}</p>
                                            <StarRating rating={comment.rating} />

                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Staff Details</h3>
                                        <div className="flex items-center space-x-3 text-gray-600">
                                            <Award className="h-5 w-5 text-purple-500" />
                                            <span>{selectedStaff.department}</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-600">

                                            <Hash className="h-5 w-5 text-purple-500" />
                                            <span>Staff Code: {selectedStaff.staffCode}</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-600">
                                            <Clock className="h-5 w-5 text-purple-500" />
                                            <span>{selectedStaff.experience} years of experience</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-600">
                                            <Phone className="h-5 w-5 text-purple-500" />
                                            <span>{selectedStaff.contact}</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-600">
                                            <Mail className="h-5 w-5 text-purple-500" />
                                            <span>{selectedStaff.email}</span>
                                        </div>
                                        <div className="mt-6">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-lg font-semibold text-gray-800">Overall Rating</span>
                                                <span className="text-2xl font-bold text-purple-600">{selectedStaff.rating.toFixed(1)}</span>
                                            </div>
                                            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                                                <div
                                                    className={`h-full ${getRatingColor(selectedStaff.rating)}`}
                                                    style={{ width: `${(selectedStaff.rating / 5) * 100}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">Based on {selectedStaff.totalRatings} ratings</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Rating Distribution</h3>
                                        <div className="space-y-6">
                                            {Object.entries(selectedStaff.ratings).map(([category, rating]) => (
                                                <div key={category}>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                                                        <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)} / 5</span>
                                                    </div>
                                                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                                                        <div
                                                            className={`h-full ${getRatingColor(rating)}`}
                                                            style={{ width: `${(rating / 5) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="bg-gray-50 px-6 py-4 flex justify-end">
                                <button
                                    className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
                                    onClick={closeModal}
                                >
                                    <span>Close</span>
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StaffRatingsReview