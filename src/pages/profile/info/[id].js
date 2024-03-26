import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";
import setToken from "../../utilities/setToken";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Infonav from "../../components/Infonav";
import Pluses from "../../components/Pluses";
import Footer from "../../components/Footer";
export default function UserInfo() {
  const [user_info, setInfo] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [price, setPrice] = useState("");

  const [hasMounted, sethasMounted] = useState(false);

  let jwtUser;

  useEffect((jwtUser) => {
    sethasMounted(true);
    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setToken(jwt);
      jwtUser = jwtDecode(jwt);
      console.log(jwtUser);
    }
    const receiveInfo = async () => {
      try {
        console.log(jwtUser.id);

        const res = await axios.get(
          `http://localhost:8800/profile/info/${jwtUser.id}`,
          { params: { id: jwtUser.id } }
        );
        setInfo(res.data);
        console.log(res.data);

        let sum = res.data[1].reduce((accumulator, object) => {
          return accumulator + object.price * object.quantity;
        }, 0);
        setPrice(sum);

        console.log(user_info, "user_info");

        console.log("Data", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    receiveInfo();
  }, []);
  const router = useRouter();

  axios.defaults.withCredentials = true;

  if (hasMounted) {
    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setToken(jwt);
      jwtUser = jwtDecode(jwt);
      console.log(jwtUser);
    }
    return (
      <>
        <Navbar />
        <Infonav />
        <div
          className="profile"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="user-profile">
            <div className="profile-circle">
              <img src="../../customer.png" />
            </div>
            {user_info != "" &&
              user_info &&
              user_info[0].map((detail) => {
                return (
                  <div key={detail.id} className="profile-form">
                    <div className="profile-text">
                      <span>Nickname</span>
                      <span>{detail.nickname}</span>
                    </div>
                    <div className="profile-text">
                      <span>Email</span>
                      <span>{detail.email}</span>
                    </div>

                    <div className="profile-text">
                      <span>Full Name</span>

                      <span>
                        {detail.first_name ? detail.first_name : "-"}{" "}
                        {detail.last_name ? detail.last_name : "-"}
                      </span>
                    </div>
                    <div className="profile-text">
                      <span>Delivery Address</span>
                      <span>{detail.address}</span>
                    </div>

                    <button
                      onClick={() => router.push(`/profile/${jwtUser.id}`)}
                      style={{
                        background: "transparent",
                        border: "none",
                        alignSelf: "flex-end",
                      }}
                    >
                      <img style={{ height: 35 }} src="../../edit.png" />
                    </button>
                  </div>
                );
              })}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                alignSelf: "flex-end",
              }}
            >
              <div className="profile-text">
                <div className="profile-text">
                  <img src="../../green-cart.png" />
                  <span style={{ color: "darkgreen" }}>Cart Sum</span>
                </div>
                <span style={{ color: "darkgreen" }}>{price} $</span>
              </div>

              <Link
                href={"/logout"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "darkgreen",
                  alignSelf: "flex-end",
                  gap: 10,
                }}
              >
                <span>Logout</span>{" "}
                <img style={{ height: 35 }} src="../../logout.png" />
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return null;
  }
}
