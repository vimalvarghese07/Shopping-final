import React, { useEffect, useState } from 'react'
import { UserDetails, update_user } from '../Helper/Helper'
import {TextField} from '../Components/FormField'
import { Toaster } from 'react-hot-toast'
import NavBar from '../Components/NavBar'
import Card from '../Components/Card'
import  Button  from '../Components/Button'
import { useFormik } from 'formik'
import Loader from '../Components/Loader'
import { useNavigate } from 'react-router-dom'


function Profile() {
    const navigate = useNavigate()
    const [userdetails,setuserdetails] = useState()
    const [isEditProfile,setiseditProfile] = useState(false)
    const editButtonClick = () =>{
        setiseditProfile(true)
       
    }
    const [isLoading,setisLoading] = useState(true)
   
    const formik = useFormik({
        initialValues:{
            name:userdetails?.name,
            email:userdetails?.email,
            phonenumber:userdetails?.phonenumber,
            username:userdetails?.username,
            gender:userdetails?.gender,

        },
        validateOnBlur:false,
        validateOnChange:false,
        enableReinitialize:true,
        onSubmit:(values) =>{
            const updatePromise = update_user({values:values})
            updatePromise.then((res) =>{
                setiseditProfile(false)
                setuserdetails(res)
            }).catch((error) =>{
                console.log(error)
            })
        }
    })
    const fetchDetails = async ()=>{
        const data = await UserDetails()

        setuserdetails(data?.Userdetails) 
        setisLoading(false)       
    }
    useEffect(() =>{
        fetchDetails();
    },[])  
    if (isLoading) {
        return(
            <Loader></Loader>
        )
    } else {
        return (
            <section className="profile">
             <Toaster position='top-center' reverseOrder={false}/>
             <NavBar activeElement={'Profile'}/>
             <div className="profile-detail">
             <h2>Profile</h2>
             <Card width={'90%'} height={'90%'} >
             <div className="profile-card">
         
             <h2>Fullname :</h2>{!isEditProfile && <h2> {userdetails?.name}</h2>}
             {isEditProfile && 
             <TextField fieldProp={formik.getFieldProps('name')} legend={'Name'} value={userdetails.name}/>}
         
             <h2>Email : </h2>{!isEditProfile && <h2> {userdetails?.email}</h2>}
             {isEditProfile && 
             <TextField fieldProp={formik.getFieldProps('email')} legend={'Email'} value={userdetails.email}/>}
         
             <h2>Phonenumber : </h2>{!isEditProfile && <h2> {userdetails?.phonenumber}</h2>}
             {isEditProfile && 
             <TextField fieldProp={formik.getFieldProps('phonenumber')} legend={'PhoneNumber'} value={userdetails.phonenumber}/>}
         
             <h2>UserName : </h2>{!isEditProfile && <h2> {userdetails?.username}</h2>}
             {isEditProfile && 
             <TextField fieldProp={formik.getFieldProps('username')} legend={'Username'} value={userdetails.username}/>}
         
             <h2>Gender : </h2>{!isEditProfile && <h2> {userdetails?.gender}</h2>}
             {isEditProfile && 
             <TextField fieldProp={formik.getFieldProps('gender')} legend={'Gender'} value={userdetails.gender}/>}
         
             </div>
             </Card>
             {!isEditProfile &&
             <Button  text={'Edit Profile'} onClick={() =>editButtonClick()} customClass={'button-2'}/> }
             
             {isEditProfile &&
                 <Button  text={'save Changes'} onClick={formik.handleSubmit} customClass={'button-2'}/> } 
             </div>   
            </section>
           )
    }
}

export default Profile;