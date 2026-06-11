import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";
import DeleteModal from "../components/DeleteModal";

export default function Users() {
  const user = JSON.parse(localStorage.getItem("user"));

  const role = user.role;

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const approveUser = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      toast.success("Faculty approved successfully");

      fetchUsers();
    } catch (error) {
      console.log(error);

      toast.error("Approval failed");
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      toast.success("Faculty removed successfully");

      fetchUsers();

      setShowDeleteModal(false);

      setSelectedUserId(null);
    } catch (error) {
      console.log(error);

      toast.error("Failed to remove faculty");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesRole = roleFilter === "" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <DashboardLayout>
      {/* Header */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-lg
          border
          border-gray-100
          p-6
          mb-6
        "
      >
        <h1
         className=" text-3xl inline-flex
      
      bg-blue-100
      text-black-700
      p-4
    
      rounded-full
      font-medium"
        >
          User Management
        </h1>

        <p className="text-gray-500 mt-2">
          Manage faculty approvals and user access.
        </p>

        <div
          className="
            inline-flex
            mt-4
            bg-blue-50
            text-blue-700
            px-4
            py-2
            rounded-full
            text-sm
            font-medium
          "
        >
          Total Users: {filteredUsers.length}
        </div>
      </div>

      {/* Filters */}

      <div
        className="
          bg-white
          p-6
          rounded-3xl
          shadow-lg
          border
          border-gray-100
          mb-6
        "
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search User..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              border
              border-gray-200
              p-3
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
            "
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="
              border
              border-gray-200
              p-3
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
            "
          >
            <option value="">All Roles</option>

            <option value="admin">Admin</option>

            <option value="faculty">Faculty</option>
          </select>
        </div>
      </div>

      {/* Table */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-lg
          border
          border-gray-100
          overflow-hidden
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-5 text-left font-semibold text-gray-700">
                  User
                </th>

                <th className="p-5 text-left font-semibold text-gray-700">
                  Email
                </th>

                <th className="p-5 text-left font-semibold text-gray-700">
                  Role
                </th>

                {role === "admin" && (
                  <th className="p-5 text-left font-semibold text-gray-700">
                    Status
                  </th>
                )}

                {role === "admin" && (
                  <th className="p-5 text-left font-semibold text-gray-700">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="
                      text-center
                      py-16
                    "
                  >
                    <div className="text-5xl mb-4">👥</div>

                    <p className="text-gray-500">No users found</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="
                      border-t
                      hover:bg-slate-50
                      transition
                    "
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            w-10
                            h-10
                            rounded-xl
                            bg-gradient-to-br
                            from-blue-600
                            to-indigo-600
                            text-white
                            flex
                            items-center
                            justify-center
                            font-semibold
                          "
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </div>

                        <span className="font-medium text-gray-800">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    <td className="p-5 text-gray-600">{user.email}</td>

                    <td className="p-5">
                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold

                          ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : user.role === "faculty"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                          }
                        `}
                      >
                        {user.role}
                      </span>
                    </td>

                    {role === "admin" && (
                      <td className="p-5">
                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold

                            ${
                              user.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                          `}
                        >
                          {user.status}
                        </span>
                      </td>
                    )}

                    {role === "admin" && (
                      <td className="p-5">
                        <div className="flex gap-2 flex-wrap">
                          {user.status === "pending" && (
                            <button
                              onClick={() => approveUser(user._id)}
                              className="
                                bg-green-600
                                text-white
                                px-4
                                py-2
                                rounded-xl
                                hover:bg-green-700
                                transition
                              "
                            >
                              Approve
                            </button>
                          )}

                          {user.role === "faculty" && (
                            <button
                              onClick={() => {
                                setSelectedUserId(user._id);
                                setShowDeleteModal(true);
                              }}
                              className="
                                bg-red-600
                                text-white
                                px-4
                                py-2
                                rounded-xl
                                hover:bg-red-700
                                transition
                              "
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUserId(null);
        }}
        onConfirm={deleteUser}
        title="Remove Faculty"
        message="
    Are you sure you want to remove this faculty account?
    This action cannot be undone.
  "
        confirmText="Remove"
      />
    </DashboardLayout>
  );
}
