import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Success = () => {
  const navigate = useNavigate();
  const { buyerId, sellerId, gigId, deliveryDays } = useParams();
  const [responseData, setResponseData] = useState(null)

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await newRequest.post("/orders/create-new-order", { buyerId, sellerId, gigId, deliveryDays })
        setResponseData(response.data);
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  return (
    <div>
      {responseData}
    </div>
  );
};

export default Success;
