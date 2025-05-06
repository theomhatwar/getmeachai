"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"

const PaymentPage = ({ username }) => {
    if (!username) {
        return <div>Error: Username is missing!</div>;  // ✅ Handle missing username
    }

    //  const { data: session } = useSession()

    const [paymentform, setPaymentform] = useState({name: "", message: "", amount: ""})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams=useSearchParams()
    const router = useRouter()


    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if(searchParams.get("paymentdone") == "true"){
        toast('Thanks for your donation!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        }
        router.push(`/${username}`)
     
    }, [])


    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
        // console.log(u, dbpayments)
    }


    const pay = async (amount) => {
        // Get the order Id 
        // console.log(session.user.name)
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            // "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "key": currentUser.razorpayid,
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options);
        rzp1.open();



    }

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            {/* Same as */}
            <ToastContainer />

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            <div className='cover w-full bg-red-500 relative'>
  <img className='object-cover w-full h-auto' src={currentUser.coverpic} alt="" />
  <div className='absolute -bottom-16 sm:-bottom-20 left-1/2 transform -translate-x-1/2 border-white overflow-hidden border-2 rounded-full size-28 sm:size-36'>
    <img className='rounded-full object-cover w-full h-full' src={currentUser.profilepic} alt="" />
  </div>
</div>

<div className="info flex flex-col justify-center items-center mt-24 md:mt-28 gap-3 text-center px-4">
  <div className='font-bold text-xl sm:text-2xl'>
    @ {username}
  </div>
  <div className='text-slate-600'>
    Let's help {username} get a chai!
  </div>
  <div className='text-slate-600 text-sm sm:text-base'>
    {payments.length} Payments · ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
  </div>

  <div className="payments flex flex-col md:flex-row gap-6 w-full max-w-5xl my-10 px-4">
    <div className='supporters w-full md:w-1/2 bg-slate-500 rounded-lg text-white p-4 md:p-6'>
      <h2 className='font-bold text-xl sm:text-2xl mb-2'>Top 10 Supporters</h2>
      <ul className='mx-3 text-sm sm:text-base'>
        {payments.length === 0 && <li>No payments yet</li>}
        {payments.map((p, i) => (
          <li key={i} className='my-4 flex items-center gap-3'>
            <img width={33} src="profile.gif" alt="user avatar" />
            <span>
              {p.name} donated <span className='font-bold'>₹{p.amount}</span> with message &quot;{p.message}&quot;
            </span>
          </li>
        ))}
      </ul>
    </div>

    <div className='makePayments w-full md:w-1/2 bg-slate-500 rounded-lg text-white p-4 md:p-6'>
      <h2 className='font-bold text-xl sm:text-2xl mb-2'>Make a Payment</h2>
      <div className='flex flex-col gap-3 mt-2'>
        <input onChange={handleChange} value={paymentform.name} name='name' className='w-full rounded-lg p-3 bg-slate-300 text-black' type="text" placeholder='Enter Name' />
        <input onChange={handleChange} value={paymentform.message} name='message' className='w-full rounded-lg p-3 bg-slate-300 text-black' type="text" placeholder='Enter message' />
        <input onChange={handleChange} value={paymentform.amount} name='amount' className='w-full rounded-lg p-3 bg-slate-300 text-black' type="text" placeholder='Enter Amount' />
        <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:from-purple-200" disabled={paymentform.name?.length < 1 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button>
      </div>
      <div className='flex flex-wrap gap-2 mt-5'>
        <button className='rounded-lg p-2 bg-slate-700' onClick={() => pay(1000)}>Pay ₹10</button>
        <button className='rounded-lg p-2 bg-slate-700' onClick={() => pay(2000)}>Pay ₹20</button>
        <button className='rounded-lg p-2 bg-slate-700' onClick={() => pay(3000)}>Pay ₹30</button>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default PaymentPage
