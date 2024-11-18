import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@redux/api/usersApiSlice";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-xl rounded-xl min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-200 mb-6 text-center">
        Users
      </h1>
      {isLoading ? (
        <div className=" text-center text-white">Loading...</div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <AdminMenu/>
          <div className="w-full md:w-4/5 mx-auto bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
            <div className="max-h-[80vh] overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-gray-700 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-300">ID</th>
                    <th className="px-4 py-3 text-left text-gray-300">NAME</th>
                    <th className="px-4 py-3 text-left text-gray-300">EMAIL</th>
                    <th className="px-4 py-3 text-left text-gray-300">ADMIN</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-700 transition-colors duration-300"
                    >
                      <td className="px-4 py-3 text-gray-400">{user._id}</td>
                      <td className="px-4 py-3 text-gray-200">
                        {editableUserId === user._id ? (
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={editableUserName}
                              onChange={(e) =>
                                setEditableUserName(e.target.value)
                              }
                              className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700 text-gray-300 focus:border-blue-500 transition-colors duration-200"
                            />
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105"
                            >
                              <FaCheck />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <span className="text-gray-300">
                              {user.username}
                            </span>
                            <button
                              onClick={() =>
                                toggleEdit(user._id, user.username, user.email)
                              }
                              className="ml-4 text-blue-400 hover:text-blue-500 transition duration-200"
                            >
                              <FaEdit />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-200">
                        {editableUserId === user._id ? (
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={editableUserEmail}
                              onChange={(e) =>
                                setEditableUserEmail(e.target.value)
                              }
                              className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700 text-gray-300 focus:border-blue-500 transition-colors duration-200"
                            />
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105"
                            >
                              <FaCheck />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <a
                              href={`mailto:${user.email}`}
                              className="text-gray-300 hover:text-gray-100 transition duration-200"
                            >
                              {user.email}
                            </a>
                            <button
                              onClick={() =>
                                toggleEdit(user._id, user.name, user.email)
                              }
                              className="ml-4 text-blue-400 hover:text-blue-500 transition duration-200"
                            >
                              <FaEdit />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-200">
                        {user.isAdmin ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {!user.isAdmin && (
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105"
                          >
                            <FaTrash />
                          </button>
                        )}
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
  );
};

export default UserList;
