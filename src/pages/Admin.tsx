import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Activity, Settings, Ban, Trash2, CheckCircle, Search, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

type Tab = 'users' | 'online';

interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  status: 'active' | 'blocked';
  lastSeen?: string;
  isOnline?: boolean;
}

function Admin() {
  const navigate = useNavigate();
  const { profile, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;

    // Check if user is admin
    if (!profile || profile.email.toLowerCase() !== 'hackthehackres@gmail.com') {
      navigate('/');
      return;
    }

    // Load users
    const loadUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'profiles'));
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];

        setUsers(usersData);
        setOnlineUsers(usersData.filter(user => user.isOnline));
        setLoading(false);
      } catch (error) {
        console.error('Error loading users:', error);
        setLoading(false);
      }
    };

    loadUsers();

    // Real-time listener for user changes
    const unsubscribeUsers = onSnapshot(
      collection(db, 'profiles'),
      (snapshot) => {
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];

        setUsers(usersData);
        setOnlineUsers(usersData.filter(user => user.isOnline));
      },
      (error) => {
        console.error('Error in real-time users listener:', error);
      }
    );

    return () => {
      unsubscribeUsers();
    };
  }, [profile, authLoading, navigate]);

  const handleBlockUser = async (userId: string, currentStatus: string) => {
    try {
      const userRef = doc(db, 'profiles', userId);
      await updateDoc(userRef, {
        status: currentStatus === 'blocked' ? 'active' : 'blocked'
      });
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'profiles', userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-primary-blue animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Navigation */}
      <nav className="bg-primary-dark border-b border-primary-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-primary-blue hover:text-primary-blue/80 flex items-center group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <span className="text-xl font-bold">Admin Panel</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'users'
                ? 'bg-primary-blue text-background'
                : 'text-primary-blue hover:bg-primary-blue/10'
            }`}
          >
            <Users className="w-5 h-5 mr-2" />
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('online')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'online'
                ? 'bg-primary-blue text-background'
                : 'text-primary-blue hover:bg-primary-blue/10'
            }`}
          >
            <Activity className="w-5 h-5 mr-2" />
            Online Users
            <span className="ml-2 bg-primary-blue/20 px-2 py-0.5 rounded-full text-sm">
              {onlineUsers.length}
            </span>
          </button>
        </div>

        {/* Search Bar */}
        {activeTab === 'users' && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-primary-dark/30 border border-primary-blue/20 rounded-md focus:outline-none focus:border-primary-blue"
              />
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 text-primary-blue animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-primary-dark/30 rounded-lg border border-primary-blue/20">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary-blue/20">
                      <th className="px-6 py-3 text-left">User</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Last Seen</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-primary-blue/10">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium">{user.fullName}</div>
                              <div className="text-sm text-gray-400">@{user.username}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full ${
                                user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">{user.lastSeen || 'N/A'}</td>
                          <td className="px-6 py-4 flex space-x-3">
                            <button
                              onClick={() => handleBlockUser(user.id, user.status)}
                              className="text-sm text-yellow-500 hover:text-yellow-700"
                            >
                              {user.status === 'blocked' ? 'Unblock' : 'Block'}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-sm text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4 inline" /> Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No users found
                        </td>
                      </tr>
                    )}

                    {onlineUsers.length > 0 && (
                      <tr className="bg-primary-dark/20">
                        <td colSpan={5} className="px-6 py-3 text-left text-xl text-primary-blue">
                          Online Users
                        </td>
                      </tr>
                    )}
                    {onlineUsers.map((user) => (
                      <tr key={user.id} className="border-b border-primary-blue/10 bg-primary-dark/5">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{user.fullName}</div>
                            <div className="text-sm text-gray-400">@{user.username}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{user.lastSeen || 'N/A'}</td>
                        <td className="px-6 py-4 flex space-x-3">
                          <button
                            onClick={() => handleBlockUser(user.id, user.status)}
                            className="text-sm text-yellow-500 hover:text-yellow-700"
                          >
                            {user.status === 'blocked' ? 'Unblock' : 'Block'}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-sm text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 inline" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
