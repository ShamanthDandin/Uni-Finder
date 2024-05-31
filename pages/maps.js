import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Maps = () => {
    const [name, setName] = useState(undefined);
    const [country, setCountry] = useState(undefined);
    const [num, setNum] = useState(0);
    useEffect(() => {
        if (name == undefined) return;
        fetch('http://172.25.4.237:3000/api/universities', { method: "POST", headers: {'status': 1, 'country': country } }).then(re => re.json()).then(res => {
            console.log(res);
            setNum(res.length);
        })
    }, [name])
    function handleLeave() {
        setName(undefined)
    }

    return (
        <>
            <Head>
                <title>Countries</title>
            </Head>
            <div className={['absolute w-[500px] top-[30%] left-[37%] h-[240px] bg-slate-700 rounded-lg text-center font-bold text-2xl', name == undefined ? 'invisible' : 'visible'].join(' ')}>
                {name}
                <div>Number of Universities in {country} are {num}</div>
            </div>
            <div className='flex flex-col w-screen h-fit'>
                <h2 className='text-center mt-[75px] font-bold text-2xl'>List universities by Country</h2>
                <div>
                    <Image onMouseDown={() => {
                        window.localStorage.setItem('course', undefined);
                        window.localStorage.setItem('country', "United States");
                        window.localStorage.setItem('ielts', undefined);
                        window.localStorage.setItem('fee', undefined);
                        window.localStorage.setItem('status', 1);
                        window.location.href = "/dashboard"
                    }} onMouseLeave={handleLeave} src={'/images/usa.jpeg'} width={320} height={200} className='mt-[20px]' onMouseEnter={() => {
                        setName("United States Of America");
                        setCountry("United States");
                    }} />
                    <Image onMouseDown={() => {
                        {
                            window.localStorage.setItem('course', undefined);
                            window.localStorage.setItem('country', "Ireland");
                            window.localStorage.setItem('ielts', undefined);
                            window.localStorage.setItem('fee', undefined);
                            window.localStorage.setItem('status', 1);
                            window.location.href = "/dashboard";
                        }
                    }} onMouseEnter={() => { setName("Ireland"); setCountry("Ireland") }} onMouseLeave={handleLeave} src={'/images/ire.jpeg'} width={320} height={200} className=' mt-[40px]' />
                    <Image onMouseDown={() => {
                        {
                            window.localStorage.setItem('course', undefined);
                            window.localStorage.setItem('country', "Singapore");
                            window.localStorage.setItem('ielts', undefined);
                            window.localStorage.setItem('fee', undefined);
                            window.localStorage.setItem('status', 1);
                            window.location.href = "/dashboard";
                        }
                    }} onMouseLeave={handleLeave} onMouseEnter={() => { setName("Singapore"); setCountry("Singapore") }} src={'/images/sing.jpeg'} width={320} height={200} className=' mt-[40px]' />
                </div>
                <div className='flex flex-col absolute right-[40%] bottom-5'>
                    <Image onMouseDown={() => {
                        {
                            window.localStorage.setItem('course', undefined);
                            window.localStorage.setItem('country', "Germany");
                            window.localStorage.setItem('ielts', undefined);
                            window.localStorage.setItem('fee', undefined);
                            window.localStorage.setItem('status', 1);
                            window.location.href = "/dashboard";
                        }
                    }} onMouseLeave={handleLeave} onMouseEnter={() => { setName("Germany"); setCountry("Germany") }} src={'/images/DE.jpg'} width={320} height={200} className='mb-[20px]' />
                </div>
                <div className='flex flex-col absolute right-5 mt-[75px]'>
                    <Image onMouseDown={() => {
                        {
                            window.localStorage.setItem('course', undefined);
                            window.localStorage.setItem('country', "United Kingdom");
                            window.localStorage.setItem('ielts', undefined);
                            window.localStorage.setItem('fee', undefined);
                            window.localStorage.setItem('status', 1);
                            window.location.href = "/dashboard";
                        }
                    }} onMouseLeave={handleLeave} onMouseEnter={() => { setName("United Kingdoms"); setCountry("United Kingdom") }} src={'/images/uk.jpeg'} width={320} height={200} className=' mt-[40px]' />
                    <Image onMouseDown={() => {
                        {
                            window.localStorage.setItem('course', undefined);
                            window.localStorage.setItem('country', "Switzerland");
                            window.localStorage.setItem('ielts', undefined);
                            window.localStorage.setItem('fee', undefined);
                            window.localStorage.setItem('status', 1);
                            window.location.href = "/dashboard";
                        }
                    }} onMouseLeave={handleLeave} src={'/images/swiss.jpeg'} onMouseEnter={() => { setName("Switzerland"); setCountry("Switzerland") }} width={320} height={200} className=' mt-[40px]' />
                    <Image onMouseDown={() => {
                        {
                            window.localStorage.setItem('course', undefined);
                            window.localStorage.setItem('country', "Spain");
                            window.localStorage.setItem('ielts', undefined);
                            window.localStorage.setItem('fee', undefined);
                            window.localStorage.setItem('status', 1);
                            window.location.href = "/dashboard";
                        }
                    }} onMouseLeave={handleLeave} src={'/images/spain.jpeg'} onMouseEnter={() => { setName("Spain"); setCountry("Spain") }} width={320} height={200} className=' mt-[60px]' />
                </div>
            </div >
        </>
    )
}

export default Maps