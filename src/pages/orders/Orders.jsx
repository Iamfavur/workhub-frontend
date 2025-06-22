import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get(`/orders`).then((res) => res.data),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  const completeBuyerOrder = useMutation({
    mutationFn: (orderId) => newRequest.post("/orders/complete-buyer-order", { orderId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const completeSellerOrder = useMutation({
    mutationFn: (orderId) => newRequest.post("/orders/complete-seller-order", { orderId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const [timeLeftMap, setTimeLeftMap] = useState({});

  useEffect(() => {
    if (data) {
      const initialTimeLeft = {};
      data.forEach(order => {
        initialTimeLeft[order._id] = calculateTimeLeft(order.deliveryCountdownEnd);
      });
      setTimeLeftMap(initialTimeLeft);

      const timer = setInterval(() => {
        setTimeLeftMap(prevTimeLeftMap => {
          const newTimeLeftMap = {};
          data.forEach(order => {
            newTimeLeftMap[order._id] = calculateTimeLeft(order.deliveryCountdownEnd);
          });
          return newTimeLeftMap;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [data]);

  useEffect(() => {
    const checkOrdersStatus = async () => {
      const expiredOrders = data.filter(order => {
        const timeLeft = calculateTimeLeft(order.deliveryCountdownEnd);
        console.log(order.deliveryCountdownEnd)
        return timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;
      });

      for (const order of expiredOrders) {
        await newRequest.post("/orders/check-order-status", { orderId: order._id });
      }
    };

    checkOrdersStatus();
  }, [timeLeftMap, data]);

  const calculateTimeLeft = (endTime) => {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };


  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Timer</th>
              </tr>
            </thead>
            <tbody>
              {data?.slice().reverse().map((order) => {
                const timeLeft = timeLeftMap[order._id] || { hours: 0, minutes: 0, seconds: 0 };

                const handleCompleteOrder = () => {
                  if (currentUser._id === order.buyerId && !order.buyerCompleted) {
                    completeBuyerOrder.mutate(order._id);
                  } else if (currentUser._id === order.sellerId && !order.sellerCompleted) {
                    completeSellerOrder.mutate(order._id);
                  }
                };

                return (
                  <tr key={order._id}>
                    <td>
                      <img className="image" src={order.img} alt="" />
                    </td>
                    <td>{order.title}</td>
                    <td>{order.price}</td>
                    <td>
                      <img
                        className="message"
                        src="./img/message.png"
                        alt=""
                        onClick={() => handleContact(order)}
                      />
                    </td>
                    <td>
                      <button onClick={handleCompleteOrder}>
                        {order.buyerId === currentUser?._id
                          ? order.buyerCompleted ? "completed ✅" : "Mark as completed"
                          : order.sellerCompleted ? "completed ✅" : "Mark as completed"}
                      </button>
                    </td>
                    <td>
                      {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
