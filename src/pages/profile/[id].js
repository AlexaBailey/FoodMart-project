import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";
import setToken from "../utilities/setToken";
import jwtDecode from "jwt-decode";
import { useFormik } from "formik";

import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Infonav from "../components/Infonav";
export default function UserInfo() {
  const [user_info, setInfo] = useState([]);

  let jwtUser;

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",

      firstName: "",
      lastName: "",
      nickname: "",
      address: "",
      bio: "",
    },

    onSubmit: async (values) => {
      try {
        await axios.post(`https://foodmart-api-production.up.railway.app//profile/${jwtUser.id}`, values);
        router.push(`/profile/info/${jwtUser.id}`);
      } catch (err) {
        setError(true);
      }
    },
    validate: (values) => {
      let errors = {};
      const regex1 = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const regex2 = /^[A-Za-z][A-Za-z0-9_]{3,29}$/i;
      if (values.email) {
        if (!regex1.test(values.email)) {
          errors.email = "Invalid email format";
        }
      }

      if (values.nickname) {
        if (values.nickname.length < 4) {
          errors.nickname = "Nickname must be more than 4 characters";
        } else if (!regex2.test(values.nickname)) {
          errors.nickname = "Start with letters, exclude symbols";
        }
      }

      return errors;
    },
  });

  const [mount, setmount] = useState(false);
  useEffect((jwtUser) => {
    setmount(true);
    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setToken(jwt);
      jwtUser = jwtDecode(jwt);
      console.log(jwtUser);
      console.log(jwtUser.id);
    }
    const getData = async () => {
      try {
        console.log("id", jwtUser.id);

        const res = await axios.get(
          `https://foodmart-api-production.up.railway.app//profile/info/${jwtUser.id}`,
          { params: { id: jwtUser.id } }
        );
        setInfo(res.data);
        console.log("Data", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  if (mount) {
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
            {user_info[0] &&
              user_info[0].map((detail) => {
                return (
                  <form
                    key={detail.id}
                    className="profile-form"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="profile-text">
                      <span>Nickname</span>
                      <input
                        placeholder={detail.nickname}
                        name="nickname"
                        className="edit-input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nickname}
                      />
                      {formik.errors.nickname ? (
                        <p className="error">{formik.errors.nickname}</p>
                      ) : null}
                    </div>
                    <div className="profile-text">
                      <span>Email</span>
                      <input
                        placeholder={detail.email}
                        name="email"
                        className="edit-input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.errors.email ? (
                        <p className="error">{formik.errors.email}</p>
                      ) : null}
                    </div>

                    <div className="profile-text">
                      <span>First Name</span>
                      <input
                        placeholder={detail.first_name}
                        name="firstName"
                        className="edit-input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                      />
                      {formik.errors.firstName ? (
                        <p className="error">{formik.errors.firstName}</p>
                      ) : null}
                    </div>

                    <div className="profile-text">
                      <span>Last Name</span>
                      <input
                        placeholder={detail.last_name}
                        name="lastName"
                        className="edit-input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                      />
                      {formik.errors.lastName ? (
                        <p className="error">{formik.errors.lastName}</p>
                      ) : null}
                    </div>
                    <div className="profile-text">
                      <span>Delivery Address</span>
                      <input
                        placeholder={detail.address}
                        name="address"
                        className="edit-input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                      />
                    </div>

                    <button
                      style={{
                        alignSelf: "flex-end",
                        height: 30,
                        width: 120,
                        borderRadius: 24,
                      }}
                      type="submit"
                      className="save-button profil"
                      onClick={formik.handleSubmit}
                    >
                      Submit
                    </button>
                  </form>
                );
              })}
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return null;
  }
}
