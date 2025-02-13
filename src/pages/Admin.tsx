import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Users, Activity, Settings, Ban, Trash2, CheckCircle, Search, 
  RefreshCw, Star, Award, Shield, Trophy, BarChart2, Clock, AlertTriangle,
  Filter, Download, Mail
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, getDocs, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

type Tab = 'users' | 'online' | 'analytics' | 'reports' | 'security';

interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  status: 'active' | 'blocked';
  lastSeen?: string;
  isOnline?: boolean;
  xp: number;
  level: number;
  completedChallenges: number;
  totalPoints: number;
  accountCreated: string;
  lastLogin: string;
  loginAttempts: number;
  role: 'user' | 'moderator' | 'admin';
  badges: string[];
  subscriptionTier: 'free' | 'pro' | 'enterprise';
}

interface SecurityAlert {
  id: string;
  type: 'login_attempt' | 'suspicious_activity' | 'password_change';
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  description: string;
  resolved: boolean;
}

function Admin() {
  const navigate = useNavigate();
  const { profile, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Calculate user level based on XP
  const calculateLevel = (xp: number): number => {
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  };

  // Format large numbers
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  useEffect(() => {
    if (authLoading) return;
    if (!profile || profile.email.toLowerCase() !== 'hackthehackres@gmail.com') {
      navigate('/');
      return;
    }

    const loadUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'profiles'));
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          xp: Math.floor(Math.random() * 10000), // Simulated XP data
          level: 1,
          completedChallenges: Math.floor(Math.random() * 50),
          totalPoints: Math.floor(Math.random() * 5000),
          accountCreated: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          loginAttempts: Math.floor(Math.random() * 10),
          role: 'user',
          badges: ['beginner', 'challenger'],
          subscriptionTier: 'free'
        })) as User[];

        // Calculate levels based on XP
        usersData.forEach(user => {
          user.level = calculateLevel(user.xp);
        });

        setUsers(usersData);
        setOnlineUsers(usersData.filter(user => user.isOnline));
        setLoading(false);
      } catch (error) {
        console.error('Error loading users:', error);
        setLoading(false);
      }
    };

    loadUsers();

    // Simulated security alerts
    const mockSecurityAlerts: SecurityAlert[] = [
      {
        id: '1',
        type: 'login_attempt',
        severity: 'high',
        timestamp: new Date(),
        description: 'Multiple failed login attempts detected',
        resolved: false
      },
      {
        id: '2',
        type: 'suspicious_activity',
        severity: 'medium',
        timestamp: new Date(),
        description: 'Unusual access pattern detected',
        resolved: false
      }
    ];
    setSecurityAlerts(mockSecurityAlerts);

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

  const handleBulkAction = async (action: 'block' | 'delete' | 'export' | 'email') => {
    if (selectedUsers.length === 0) return;

    switch (action) {
      case 'block':
        if (window.confirm(`Are you sure you want to block ${selectedUsers.length} users?`)) {
          // Implement bulk block logic
        }
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
          // Implement bulk delete logic
        }
        break;
      case 'export':
        // Implement export logic
        const exportData = users
          .filter(user => selectedUsers.includes(user.id))
          .map(user => ({
            username: user.username,
            email: user.email,
            level: user.level,
            xp: user.xp,
            points: user.totalPoints
          }));
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'selected_users.json';
        a.click();
        break;
      case 'email':
        // Implement bulk email logic
        break;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

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
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'analytics'
                ? 'bg-primary-blue text-background'
                : 'text-primary-blue hover:bg-primary-blue/10'
            }`}
          >
            <BarChart2 className="w-5 h-5 mr-2" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeTab === 'security'
                ? 'bg-primary-blue text-background'
                : 'text-primary-blue hover:bg-primary-blue/10'
            }`}
          >
            <Shield className="w-5 h-5 mr-2" />
            Security
            {securityAlerts.filter(alert => !alert.resolved).length > 0 && (
              <span className="ml-2 bg-red-500 px-2 py-0.5 rounded-full text-sm">
                {securityAlerts.filter(alert => !alert.resolved).length}
              </span>
            )}
          </button>
        </div>

        {/* Search and Filters */}
        {activeTab === 'users' && (
          <div className="mb-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-primary-dark/30 border border-primary-blue/20 rounded-md focus:outline-none focus:border-primary-blue"
                />
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 bg-primary-dark/30 border border-primary-blue/20 rounded-md focus:outline-none focus:border-primary-blue"
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="moderator">Moderators</option>
                <option value="admin">Admins</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-primary-dark/30 border border-primary-blue/20 rounded-md focus:outline-none focus:border-primary-blue"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
              <div className="flex items-center space-x-4 bg-primary-dark/30 p-4 rounded-lg border border-primary-blue/20">
                <span className="text-sm text-gray-400">
                  {selectedUsers.length} users selected
                </span>
                <button
                  onClick={() => handleBulkAction('block')}
                  className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-md hover:bg-yellow-500/20"
                >
                  <Ban className="w-4 h-4 inline mr-1" />
                  Block Selected
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4 inline mr-1" />
                  Delete Selected
                </button>
                <button
                  onClick={() => handleBulkAction('export')}
                  className="px-3 py-1 bg-green-500/10 text-green-500 rounded-md hover:bg-green-500/20"
                >
                  <Download className="w-4 h-4 inline mr-1" />
                  Export Selected
                </button>
                <button
                  onClick={() => handleBulkAction('email')}
                  className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-md hover:bg-blue-500/20"
                >
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Selected
                </button>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 text-primary-blue animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === 'users' && (
              <div className="bg-primary-dark/30 rounded-lg border border-primary-blue/20">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-primary-blue/20">
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers(users.map(u => u.id));
                              } else {
                                setSelectedUsers([]);
                              }
                            }}
                            className="rounded border-primary-blue/20"
                          />
                        </th>
                        <th className="px-6 py-3 text-left">User</th>
                        <th className="px-6 py-3 text-left">Level & XP</th>
                        <th className="px-6 py-3 text-left">Achievements</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Last Seen</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-primary-blue/10">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedUsers([...selectedUsers, user.id]);
                                } else {
                                  setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                                }
                              }}
                              className="rounded border-primary-blue/20"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium">{user.fullName}</div>
                              <div className="text-sm text-gray-400">@{user.username}</div>
                              <div className="text-sm text-gray-400">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 rounded-full bg-primary-blue/20 flex items-center justify-center">
                                {user.level}
                              </div>
                              <div>
                                <div className="text-sm font-medium">Level {user.level}</div>
                                <div className="text-xs text-gray-400">{formatNumber(user.xp)} XP</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <Trophy className="w-4 h-4 text-yellow-500" />
                              <span>{user.completedChallenges} challenges</span>
                            </div>
                            <div className="text-sm text-gray-400">
                              {formatNumber(user.totalPoints)} points
                            </div>
                          </td>
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
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleBlockUser(user.id, user.status)}
                                className="p-1 text-yellow-500 hover:bg-yellow-500/10 rounded"
                                title={user.status === 'blocked' ? 'Unblock' : 'Block'}
                              >
                                <Ban className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* User Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Total Users</h3>
                      <Users className="w-6 h-6 text-primary-blue" />
                    </div>
                    <p className="text-3xl font-bold">{formatNumber(users.length)}</p>
                    <p className="text-sm text-gray-400 mt-2">+12% from last month</p>
                  </div>
                  <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Active Users</h3>
                      <Activity className="w-6 h-6 text-primary-blue" />
                    </div>
                    <p className="text-3xl font-bold">{formatNumber(onlineUsers.length)}</p>
                    <p className="text-sm text-gray-400 mt-2">Currently online</p>
                  </div>
                  <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Pro Users</h3>
                      <Star className="w-6 h-6 text-primary-blue" />
                    </div>
                    <p className="text-3xl font-bold">
                      {formatNumber(users.filter(u => u.subscriptionTier === 'pro').length)}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">Paid subscriptions</p>
                  </div>
                  <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Avg. Level</h3>
                      <Award className="w-6 h-6 text-primary-blue" />
                    </div>
                    <p className="text-3xl font-bold">
                      {Math.round(users.reduce((acc, user) => acc + user.level, 0) / users.length)}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">User progression</p>
                  </div>
                </div>

                {/* Challenge Completion Stats */}
                <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
                  <h3 className="text-xl font-semibold mb-6">Challenge Completion Stats</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-lg font-medium mb-4">Most Popular Challenges</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>PowerShell Analysis</span>
                          <span className="text-primary-blue">89% completion</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Miner on the Run</span>
                          <span className="text-primary-blue">76% completion</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-4">Average Completion Time</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Easy Challenges</span>
                          <span className="text-primary-blue">45 minutes</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Medium Challenges</span>
                          <span className="text-primary-blue">2.5 hours</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-4">Success Rate</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>First Attempts</span>
                          <span className="text-primary-blue">65%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Multiple Attempts</span>
                          <span className="text-primary-blue">92%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                {/* Security Alerts */}
                <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
                  <h3 className="text-xl font-semibold mb-6">Security Alerts</h3>
                  <div className="space-y-4">
                    {securityAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          alert.severity === 'high'
                            ? 'bg-red-500/10 border border-red-500/20'
                            : alert.severity === 'medium'
                            ? 'bg-yellow-500/10 border border-yellow-500/20'
                            : 'bg-blue-500/10 border border-blue-500/20'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <AlertTriangle className={`w-6 h-6 ${
                            alert.severity === 'high'
                              ? 'text-red-500'
                              : alert.severity === 'medium'
                              ? 'text-yellow-500'
                              : 'text-blue-500'
                          }`} />
                          <div>
                            <p className="font-medium">{alert.description}</p>
                            <p className="text-sm text-gray-400">
                              {alert.timestamp.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <button
                          className={`px-3 py-1 rounded-md ${
                            alert.resolved
                              ? 'bg-green-500/10 text-green-500'
                              : 'bg-gray-500/10 text-gray-400'
                          }`}
                        >
                          {alert.resolved ? 'Resolved' : 'Mark as Resolved'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Login Activity */}
                <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
                  <h3 className="text-xl font-semibold mb-6">Recent Login Activity</h3>
                  <div className="space-y-4">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Clock className="w-5 h-5 text-primary-blue" />
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-sm text-gray-400">{user.lastLogin}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">
                          {user.loginAttempts} login attempts
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
