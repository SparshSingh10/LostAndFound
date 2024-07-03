import React from 'react'
import ItemInfo from '../components/ItemInfo'
import FooterBar from '../components/layouts/FooterBar'
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import {Link} from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { toast } from 'react-toastify';
const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function IteminfoPage() {
  const [itemInfo,setitemInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();
  console.log('ID:', id);
  React.useEffect(() => {
    fetch(`${REACT_APP_API_URL}/client/post/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(itemInfo => {
        console.log(itemInfo); // Log the retrieved data
        setitemInfo(itemInfo);
      })
      .catch(error =>{
        console.error('Fetch error:', error);
        toast.error("Fetching error");
    });
  }, [id]);
  
  return (
    <>
      <ItemInfo {...itemInfo} />
      <FooterBar/>
    </>
  )
}
