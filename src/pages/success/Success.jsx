import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Success = () => {
  const navigate = useNavigate();
  const { buyerId, sellerId, gigId, deliveryDays } = useParams();
  const [responseData, setResponseData] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await newRequest.post("/orders/create-new-order", { buyerId, sellerId, gigId, deliveryDays })
        setResponseData(response.data);
        setIsLoading(false);
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
      {isLoading ? "Processing your order..." : responseData}
    </div>
  );
};

export default Success;
