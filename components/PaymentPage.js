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
                {/* BACKGROUND IMG */}
                {/* <img className='object-cover w-full h-auto' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxMjAwLCJ3ZSI6MX0%3D/18.gif?token-time=1741046400&token-hash=T84CEI0oOPH7FNxbVb4U4yJWzV0mxgu0kR4cJlPbpuM%3D" alt="" /> */}
                <img className='object-cover w-full h-auto' src={currentUser.coverpic} alt="" />
                {/* PROFILE PIC */}
                <div className='absolute -bottom-20 right-[33%] md:right-[46%] border-white overflow-hidden border-2 rounded-full size-36'>
                    <img className='rounded-full object-cover size-36' width={128} height={128} src={currentUser.profilepic} alt="" />
                    {/* <img className='rounded-full w-[130px] h-[130px] object-cover' src="https://png.pngtree.com/thumb_back/fh260/background/20241213/pngtree-cute-stunning-pink-anime-girl-wallpapers-image_16779021.jpg" alt="" /> */}
                </div>
            </div>

            <div className="info flex flex-col justify-center items-center my-24 gap-4">
                <div className='font-bold text-lg'>
                    @ {username}
                </div>
                <div className='text-slate-600'>
                   Lets help {username} get a chai!
                </div>
                <div className='text-slate-600'>
                    {payments.length} Payments .   ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>

                <div className="payments flex gap-3 w-[80%] my-10">
                    <div className='supporters w-1/2 bg-slate-500 rounded-lg text-white p-4 '>
                        {/* show list of all supporters as leaderboard */}
                        <h2 className='font-bold text-2xl '>Top 10 Supporters</h2>
                        <ul className='mx-5 text-lg'>
                            {payments.length == 0 && <li>No payments yet</li>}
                            {payments.map((p, i) => {
                                return <li key={i} className='my-4 flex gap-2 items-center'>
                                    <img width={33} src="profile.gif" alt="user avatar" />
                                    <span>
                                        {p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message &quot;{p.message}&quot;
                                    </span>
                                </li>
                            })}

                        </ul>
                    </div>
                    <div className='makePayments w-1/2  bg-slate-500 rounded-lg text-white p-4 '>
                        <h2 className='font-bold text-2xl '>Make a Payment</h2>
                        <div className='flex flex-col gap-2 mt-2'>
                            <input onChange={handleChange} value={paymentform.name} name='name' className='w-full rounded-lg p-3 bg-slate-300 text-black' type="text" placeholder='Enter Name' />
                            <input onChange={handleChange} value={paymentform.message} name='message' className='w-full rounded-lg p-3 bg-slate-300 text-black' type="text" placeholder='Enter message' />
                            <input onChange={handleChange} value={paymentform.amount} name='amount' className='w-full rounded-lg p-3 bg-slate-300 text-black' type="text" placeholder='Enter Amount' />
                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabeled:from-purple-200" disabled={paymentform.name?.length < 1 || paymentform.message?.length < 4 || paymentform.amount?.length<1}>Pay</button>
                        </div>
                        <div className='flex gap-2 mt-5'>
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
