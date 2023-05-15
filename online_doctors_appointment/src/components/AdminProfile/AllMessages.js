import React from "react";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

const AllMessages = () => {
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get("/messages");
        setMessage(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getMessage();
  }, []);
  return (
    <div className="dashboard">
      {!isLoading && message ? (
        <div>
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {message.map((bumba) => (
                  <tr key={bumba._id}>
                    <td>{bumba.name}</td>
                    <td>{bumba.email}</td>
                    <td>{bumba.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="loading">
          <p>Loading....</p>
        </div>
      )}
    </div>
  );
};

export default AllMessages;
