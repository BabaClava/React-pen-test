import React from 'react';
import Preloader from '../../commons/Preloader';

const ProfileDescription = ({profile, ...props}) => {
    if (!profile) return <Preloader/>

    let contacts = Object.keys(profile.contacts).map((el) => {
        return (
            <li key={el}>
                <span>{el}: </span>
                <span>{profile.contacts[el]}</span>
            </li>
        )
    })
    return ( 
        <div>
            <div>
                <span>Full Name: </span>
                <span>{profile.fullName}</span>
            </div>
            <div>
                <span>About me: </span>
                <span>{profile.aboutMe}</span>
            </div>
            <div>
                <span>Looking for a job: </span>
                <span>{!!profile.lookingForAJob ? 'yes' : 'no'}</span>
            </div>
            {!!profile.lookingForAJob && 
                <div>
                    <span>My profession skills: </span>
                    <span>{profile.lookingForAJobDescription}</span>
                </div>}
            <div>
                <span>Contacts: </span>
                <div>
                    <ul>{contacts}</ul>
                </div>
            </div>
            {props.isOwner && <div>
                <button onClick={props.editStart}
                >Edit
                </button>
            </div>}
        </div>
    );
}
 
export default ProfileDescription;