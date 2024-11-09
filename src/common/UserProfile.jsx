import React, { useState } from 'react';  
import { FaUserEdit } from 'react-icons/fa';  
import userpic from '../images/userpic.png';  
import { useAuth } from '../context/auth';  
import axios from 'axios'; // Import Axios
import UserMenu from './UserMenu';


const UserProfile = () => {  
  const [auth] = useAuth();  
  const [isEditing, setIsEditing] = useState(false);  
  const [formData, setFormData] = useState({  
    name: auth.user.name || '',  
    email: auth.user.email || '',  
    phone: auth.user.phno || '',  
    address: auth.user.address || '',  
  });  

  const [imagePreview, setImagePreview] = useState('');  
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleChange = (e) => {  
    const { name, value } = e.target;  
    setFormData((prevData) => ({ ...prevData, [name]: value }));  
  };  

  const handleEditToggle = async () => {  
    debugger;
    if (isEditing) {  
      // Call the API to update the profile
      try {
        const response = await axios.post(`https://localhost:7294/API/UpdateProfile`, {
          Id: auth.user.id, // Send Id in the body
          Name: formData.name, // Send Name in the body
          Email: formData.email, // Send Email in the body
          phno: Number(formData.phone), // Convert phone number to a number and send in the body
          address: formData.address, // Send address in the body
        });

        if (response.data.status.code === 1) {
          setSuccessMessage(response.data.status.message); // Set success message
        } else {
          setSuccessMessage('Failed to update profile.'); // Handle other status codes if necessary
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        setSuccessMessage('Error updating profile. Please try again later.'); // Set error message
      }
    }  
    setIsEditing(!isEditing);  
  };  

  return (  
    <>  
     
      <div className="profile-container">  
        <h1>User Profile</h1>  
        <div className="profile-info">  
          <img src={imagePreview || userpic} alt="User Avatar" className="profile-photo" />  
          <h2>{formData.name}</h2>  
          <p><strong>Email:</strong> {formData.email}</p>  
          <p><strong>Phone:</strong> {formData.phone}</p>  
          <p><strong>Address:</strong> {formData.address}</p>  
          <button onClick={handleEditToggle}>  
            <FaUserEdit /> {isEditing ? 'Save' : 'Edit'}  
          </button>  
          {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
        </div>  
        {isEditing && (  
          <div className="profile-edit">  
            <h2>Edit Profile</h2>  
            <form>  
              <div>  
                <label>Name:</label>  
                <input  
                  type="text"  
                  name="name"  
                  value={formData.name}  
                  onChange={handleChange}  
                />  
              </div>  
              <div>  
                <label>Email:</label>  
                <input  
                  type="email"  
                  name="email"  
                  value={formData.email}  
                  onChange={handleChange}  
                />  
              </div>  
              <div>  
                <label>Phone:</label>  
                <input  
                  type="tel"  
                  name="phone"  
                  value={formData.phone}  
                  onChange={handleChange}  
                />  
              </div>  
              <div>  
                <label>Address:</label>  
                <input  
                  type="text"  
                  name="address"  
                  value={formData.address}  
                  onChange={handleChange}  
                />  
              </div>  
            </form>  
          </div>  
        )}  
      </div>  
      <style jsx>{`  
        .profile-container {  
          max-width: 600px;  
          margin: auto;  
          padding: 20px;  
          border: 1px solid #ddd;  
          border-radius: 8px;  
                   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);  
          background-color: #fff;  
          margin-bottom: 20px;  
        }  
        .profile-info {  
          text-align: center;  
        }  
        .profile-photo {  
          width: 150px;  
          height: 150px;  
          border-radius: 75px;  
          margin: 10px 0;  
          object-fit: cover;  
        }  
        h1 {  
          font-size: 2em;  
          margin-bottom: 20px;  
          color: #333;  
        }  
        h2 {  
          font-size: 1.5em;  
          margin: 10px 0;  
          color: #007bff;  
        }  
        p {  
          font-size: 1em;  
          color: #555;  
        }  
        button {  
          padding: 10px 15px;  
          border: none;  
          border-radius: 5px;  
          color: white;  
          background-color: #007bff;  
          cursor: pointer;  
          font-size: 1em;  
          margin-top: 10px;  
          transition: background-color 0.3s;  
        }  
        button:hover {  
          background-color: #0056b3;  
        }  
        .profile-edit {  
          margin-top: 20px;  
          padding: 15px;  
          border: 1px solid #ddd;  
          border-radius: 8px;  
          background-color: #f9f9f9;  
        }  
        .profile-edit div {  
          margin: 10px 0;  
        }  
        .profile-edit label {  
          display: block;  
          margin-bottom: 5px;  
          font-weight: bold;  
        }  
        .profile-edit input {  
          width: 100%;  
          padding: 10px;  
          border: 1px solid #ccc;  
          border-radius: 4px;  
          font-size: 1em;  
        }  
        .success-message {  
          color: green;  
          margin-top: 10px;  
        }  
        @media (max-width: 600px) {  
          .profile-container {  
            padding: 15px;  
          }  
          h1 {  
            font-size: 1.8em;  
          }  
          h2 {  
            font-size: 1.3em;  
          }  
          button {  
            width: 100%;  
          }  
        }  
      `}</style>  
    </>  
  );  
};  

export default UserProfile;

