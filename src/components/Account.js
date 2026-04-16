import React from 'react'
import { IoExitOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';

function Account({setIsLogedIn}){

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  if(!user){
    return <p className="no-user">Please login to view account</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLogedIn(false);
    navigate('/');
  };

  return (
    <div className='account_wrapper'>
      <div className='account_card'>

        <div className='account_header'>
          <FaRegUserCircle className='user_icon'/>
          <h2>{user.firstName} {user.lastName}</h2>
        </div>

        <div className='account_info'>
          <p className='info_item'>
            <TfiEmail className='icon' fontSize={'1rem'} />
            <span>{user.email}</span>
          </p>
        </div>

        <button className='logout_btn' onClick={handleLogout}>
          Logout <IoExitOutline fontSize={'1.3rem'} />
        </button>

      </div>
    </div>
  )
}

export default Account;