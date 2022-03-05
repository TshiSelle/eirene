import React from "react";
import { useUser } from "../../../context/UserContext";

const ProfilePage = () => {
  const { user } = useUser();
    return (
        <>
        <h2>{user}</h2>
        </>
    );
}

export default ProfilePage;