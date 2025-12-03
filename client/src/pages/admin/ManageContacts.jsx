import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Calendar,
  Search,
  Filter,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  Archive,
  MessageSquare,
  X,
  ExternalLink,
} from "lucide-react";

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    read: 0,
    replied: 0,
    archived: 0,
  });

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, [statusFilter]);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");
      const url =
        statusFilter === "all"
          ? "/api/contact"
          : `/api/contact?status=${statusFilter}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data.data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/contact/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const viewContact = async (contact) => {
    setSelectedContact(contact);
    setShowModal(true);

    // Mark as read if it's new
    if (contact.status === "new") {
      updateContactStatus(contact._id, "read");
    }
  };

  const updateContactStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/contact/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchContacts();
      fetchStats();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchContacts();
      fetchStats();
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const badges = {
      new: "bg-blue-100 text-blue-800",
      read: "bg-yellow-100 text-yellow-800",
      replied: "bg-green-100 text-green-800",
      archived: "bg-gray-100 text-gray-800",
    };
    return badges[status] || badges.new;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return <Mail className="w-4 h-4" />;
      case "read":
        return <Eye className="w-4 h-4" />;
      case "replied":
        return <CheckCircle className="w-4 h-4" />;
      case "archived":
        return <Archive className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Contact Messages
        </h1>
        <p className="text-gray-600">
          Manage and respond to contact form submissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg shadow-sm p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">New</p>
              <p className="text-2xl font-bold text-blue-900">{stats.new}</p>
            </div>
            <Mail className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg shadow-sm p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Read</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.read}</p>
            </div>
            <Eye className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg shadow-sm p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Replied</p>
              <p className="text-2xl font-bold text-green-900">
                {stats.replied}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Archived</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.archived}
              </p>
            </div>
            <Archive className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContacts.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No contacts found
                </td>
              </tr>
            ) : (
              filteredContacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {contact.name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {contact.email}
                      </div>
                      {contact.phone && (
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {contact.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {contact.subject}
                    </div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">
                      {contact.message.substring(0, 60)}...
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                        contact.status
                      )}`}
                    >
                      {getStatusIcon(contact.status)}
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(contact.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => viewContact(contact)}
                      className="text-teal-600 hover:text-teal-900 mr-4"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteContact(contact._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Contact Detail Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Contact Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                      selectedContact.status
                    )}`}
                  >
                    {getStatusIcon(selectedContact.status)}
                    {selectedContact.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">
                      Name
                    </label>
                    <p className="text-gray-900 font-medium">
                      {selectedContact.name}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">
                      Email
                    </label>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="text-teal-600 hover:underline flex items-center gap-1"
                    >
                      {selectedContact.email}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {selectedContact.phone && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase">
                        Phone
                      </label>
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="text-teal-600 hover:underline"
                      >
                        {selectedContact.phone}
                      </a>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">
                      Subject
                    </label>
                    <p className="text-gray-900 font-medium">
                      {selectedContact.subject}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                    Message
                  </label>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                    Update Status
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        updateContactStatus(selectedContact._id, "read");
                        setShowModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors font-medium"
                    >
                      Mark as Read
                    </button>
                    <button
                      onClick={() => {
                        updateContactStatus(selectedContact._id, "replied");
                        setShowModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                    >
                      Mark as Replied
                    </button>
                    <button
                      onClick={() => {
                        updateContactStatus(selectedContact._id, "archived");
                        setShowModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Archive
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContacts;
