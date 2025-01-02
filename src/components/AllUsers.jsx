import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../firebase/auth";

function AllUsers() {
  const [usersList, setUsersList] = useState([]);
  const currentUserId = useSelector((state) => state.auth.userData.uid);
  const currentUserName = useSelector(
    (state) => state.auth.userData.displayName
  );

  useEffect(() => {
    async function fetchUser() {
      try {
        const userCollection = collection(db, "users");
        const queryUsers = await getDocs(userCollection);
        const userList = queryUsers.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsersList(userList);
      } catch (error) {
        console.log("Error Fetching Users : ", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <>
      <div className="bg-[#383759] h-[12vh]">
        <div className="flex h-full items-center justify-between font-semibold p-2">
          <h1 className="text-white text-xl">ChatMate</h1>
          <div className="flex flex-col gap-1 text-white">
            <h1>User: {currentUserName}</h1>
            <button
              onClick={authService.clearSession}
              className="border bg-[#605E8C] rounded hover:bg-[#504E78]"
            >
              logout
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <ul className="text-white w-full ">
          {usersList
            .filter((user) => user.id !== currentUserId)
            .map((user) => (
              <li
                key={user.id}
                className="font-semibold text-xl py-3 px-4 border-b-2
              w-full hover:bg-[#605E8C] "
              >
                <Link to={`chat/${user.id}`} className="block w-full">
                  {user.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default AllUsers;
