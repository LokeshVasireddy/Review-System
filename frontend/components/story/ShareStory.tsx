"use client";

import React,{useState} from 'react'
import {CompanyType} from '@/type'
import {useRouter} from 'next/navigation'
import Select from 'react-select'
import { handleRequest } from '../utils/apiRequest';
import { BASE_API_URL } from '@/server';
import axios from 'axios';
import { useEffect } from 'react';


const ShareStory = () => {
  // state variables
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyType[]>([]);

  // formdata for our backend request
  const [formData, setFormData] = useState({
    vibe: "neutral",
    companyName: "",
    isAnonymous: false,
    name: "",
    userType: "individual customer",
    title: "",
    story: "",
  });
  const router = useRouter();
  const companyOptions = companies.map((c) => ({
    label: c.name,
    value: c.name,
  }));

  // Vibe options
  const vibeOptions = [
    { value: "neutral", Label: "Neutral" },
    { value: "positive", Label: "Positive" },
    { value: "negative", Label: "Negative" },
  ];
  const userTypeOptions = [
    { value: "individual customer", Label: "Individual Customer" },
    { value: "business customer", Label: "Business Customer" },
    { value: "bank employee", Label: "Bank Employee" },
    { value: "former employee", Label: "Former Employee" },
    { value: "investor", Label: "Investor" },
    { value: "other", Label: "Other" },
  ];
  // fetch our company from backend
useEffect(() => {
  const fetchCompanies = async () => {
    const companyReq = async () => 
      await axios.get(`${BASE_API_URL}/companies/all`);
    
    const result = await handleRequest(companyReq, setIsLoading);
    
    if (result?.data.status === "success") {
      setCompanies(result.data.data.companies);
    }
  };
  fetchCompanies();
}, []);
console.log("COMPANIES",companies);
  return <div>ShareStory</div>;

};

export default ShareStory
