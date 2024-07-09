import { useState } from "react";
import { getToken } from "../utils/tokenServices";
import { GetProfileresponse, User } from "../@types";
import { baseUrl } from "../utils/baseUrl";

function UserProfile() {
  const [userProfile, setUserProfile] = useState<User | null>(null);

  const getUserProfile = async () => {
    const token = getToken();
    if (!token) {
      alert("You need to login first");
      return;
    }
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          `${baseUrl}/api/users/profile`,
          requestOptions
        );
        if (!response.ok && response.status === 401) {
          alert("token invalid, or login again...");
          return;
        }
        if (response.ok) {
          const result = (await response.json()) as GetProfileresponse;
          console.log("result :>> ", result);
          setUserProfile(result.user);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  };
  return (
    <div>
      <h2>User Profile</h2>
      <button onClick={getUserProfile}>Get Profile</button>
      {userProfile && (
        <div>
          <p>Name: {userProfile.username}</p>
          <p>Email: {userProfile.email}</p>
          <img src={userProfile.avatar} alt="user profile picture" />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
