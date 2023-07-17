import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUser, addUser, updateUser, deleteUser } from './userSlice'
import Button from "./Button"
import axios from "axios"

const User = () => {
    const [userData, setUserData] = useState({_id: '', firstName: '', lastName: '', email: '', age: 0, sex: ''})
    const [loading, setLoading] = useState(false)

    const { users } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUser())
    }, [dispatch])
    
    const saveUser = e => {
        e.preventDefault()
        if (!userData._id){
            dispatch(addUser(userData))
        } else {
            setUserData(userData)
            dispatch(updateUser(userData))
        }
        setUserData({_id: '', firstName: '', lastName: '', email: '', age: 0, sex: ''})
    }

    const handleInputChange = e => {
        setUserData(prevUserData => {
            return {
                ...prevUserData,
                [e.target.name]: e.target.value,
            }
        }
    )}

    const editUser = (_id) => {
        const editedUser = users.find(el => el._id === _id)
        setUserData(editedUser)
    }

    const removeUser = (_id) => {
        dispatch(deleteUser(_id))
    }

    return(
        <>
            <h2>
                Users
            </h2>

            <form onSubmit={saveUser}>
                <div>
                    <label>
                    მიუთითეთ სახელი:
                        <input 
                            type="text"
                            name='firstName'
                            placeholder="firstName"
                            value={userData.firstName}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                {/* {formErrors.firstName && <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.firstName}</p>} */}

                <div>
                    <label>
                    მიუთითეთ გვარი:
                        <input
                            type="text"
                            name='lastName'
                            value={userData.lastName}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                {/* {formErrors.lastName && <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.lastName}</p>} */}

                <div>
                    <label>
                    მიუთითეთ ელ. ფოსტა:
                        <input
                            type="text"
                            name='email'
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                {/* {formErrors.email && <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.email}</p>} */}

                <div>
                    <label>
                    მიუთითეთ ასაკი:
                        <input
                            type="number"
                            name='age'
                            value={userData.age}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                {/* {formErrors.age && <p style={{ fontWeight: 'bold', color: 'red' }}>{formErrors.age}</p>} */}

                <div>
                    <label>
                    მიუთითეთ სქესი:
                        <select name='sex' onChange={handleInputChange} defaultValue={'female'}>
                            <option value={'female'}>მდედრ.</option>
                            <option value={'male'}>მამრ.</option>
                        </select>
                    </label>
                </div>

                {/* <Button disabled={!isFormValid}>შენახვა</Button> */}
                <Button>შენახვა</Button>
            </form>
            <hr/>

            {loading && <h2>Loading...</h2>}

            <ul>
                {users.map((elem) => {
                    return <li key={elem._id}>{elem.firstName} | {elem.lastName} | {elem.email} | {elem.age} | {elem._id} | {elem.sex} |
                        <Button onClick={() => editUser(elem._id)}>რედაქტირება</Button> | 
                        <Button onClick={() => removeUser(elem._id)}>წაშლა</Button>
                    </li>
                })}
            </ul>

            <hr/>
        </>
    )
}

export default User
