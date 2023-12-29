import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../api/axios";
import "../styles/Profile.css";

const Profile = () => {
  const myState = useSelector((state) => state.updateUser);
  const GET_PROFILE_URL = `/getprofile/${myState}`;
  const UPDATE_PROFILE_URL = `/updateProfile`;
  const [userDtails, setUserDetails] = useState({
    userId: "",
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  const loadProfile = () => {
    axios
      .get(GET_PROFILE_URL, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const user = res.data;
        setUserDetails((prevState) => ({
          ...prevState,
          userId: user.userID,
          name: user.name,
          email: user.email,
          phone: user.phone,
          street: user.address.street,
          city: user.address.city,
          state: user.address.state,
          pincode: user.address.pincode,
        }));
      });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    axios
      .post(
        UPDATE_PROFILE_URL,
        {
          userID: userDtails.userId,
          name: userDtails.name,
          email: userDtails.email,
          phone: userDtails.phone,
          address: {
            street: userDtails.street,
            city: userDtails.city,
            state: userDtails.state,
            pincode: userDtails.pincode,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res.data);
        toggleEdit();
      })
      .catch((err) => {
        console.log("No Server Respose");
      });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return !isEditing ? (
    <div className="full-div">
      <div className="details-div">
        <h1 className="heading">Your Profile</h1>

        <div className="info-container">
          <div className="info-title">
            <p className="detail-p">UserId :</p>
            <p className="detail-p">Name :</p>
            <p className="detail-p">Phone :</p>
            <p className="detail-p">Email :</p>
            <p className="detail-p">Street :</p>
            <p className="detail-p">City :</p>
            <p className="detail-p">State :</p>
            <p className="detail-p">Pincode :</p>
          </div>

          <div className="info">
            <p className="detail-p">{userDtails.userId}</p>
            <p className="detail-p">{userDtails.name}</p>
            <p className="detail-p">{userDtails.phone}</p>
            <p className="detail-p">{userDtails.email}</p>
            <p className="detail-p">{userDtails.street}</p>
            <p className="detail-p">{userDtails.city}</p>
            <p className="detail-p">{userDtails.state}</p>
            <p className="detail-p">{userDtails.pincode}</p>
          </div>
        </div>
        <button className="edit-profile-button" onClick={toggleEdit}>
          Edit Profile
        </button>
      </div>
    </div>
  ) : (
    <div className="full-div">
      <div className="details-div">
        <h1 className="heading">Edit Your Profile</h1>

        <form className="edit-form">
          <p className="detail-p">UserId : {userDtails.userId}</p>
          <div className="edit-field">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              id="name"
              onChange={(e) =>
                setUserDetails((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              value={userDtails.name}
              required
            />
          </div>

          <p className="detail-p">Email : {userDtails.email}</p>
          <div className="edit-field">
            <label htmlFor="phone">Phone : </label>
            <input
              type="phone"
              id="phone"
              onChange={(e) =>
                setUserDetails((prevState) => ({
                  ...prevState,
                  phone: e.target.value,
                }))
              }
              value={userDtails.phone}
              required
            />
          </div>
          <div className="edit-field">
            <label htmlFor="street">Street : </label>
            <input
              type="text"
              id="street"
              onChange={(e) =>
                setUserDetails((prevState) => ({
                  ...prevState,
                  street: e.target.value,
                }))
              }
              value={userDtails.street}
              required
            />
          </div>
          <div className="edit-field">
            <label htmlFor="city">City : </label>
            <input
              type="text"
              id="city"
              onChange={(e) =>
                setUserDetails((prevState) => ({
                  ...prevState,
                  city: e.target.value,
                }))
              }
              value={userDtails.city}
              required
            />
          </div>
          <div className="edit-field">
            <label htmlFor="state">State : </label>
            <input
              type="text"
              id="state"
              onChange={(e) =>
                setUserDetails((prevState) => ({
                  ...prevState,
                  state: e.target.value,
                }))
              }
              value={userDtails.state}
              required
            />
          </div>
          <div className="edit-field">
            <label htmlFor="pincode">Pincode : </label>
            <input
              type="number"
              id="pincode"
              onChange={(e) =>
                setUserDetails((prevState) => ({
                  ...prevState,
                  pincode: e.target.value,
                }))
              }
              value={userDtails.pincode}
              required
            />
          </div>
        </form>

        <button
          type="submit"
          className="edit-profile-button"
          onClick={updateProfile}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
