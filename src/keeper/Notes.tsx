import React from "react";
import { useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";

interface Props {}

const Notes = (props: Props) => {
    const history = useHistory();
    const { user } = useAuth();
    console.log(user);

    if (user) {
        history.push("/login");
    }

    return <div>user: {user ? "true" : "false"}</div>;
};

export default Notes;
