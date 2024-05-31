import React, { useEffect, useState } from 'react'
import { GoLocation } from 'react-icons/go'
import { AiOutlinePercentage } from 'react-icons/ai'
import { LuClock } from 'react-icons/lu'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/index.module.css'

const UniCycler = ({ country, uniName, location, ielts, siteUrl, id, duration }) => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState({});
    const [beginProcess, setBeginProcess] = useState(false);
    var code = undefined;
    if (country == 'Germany')
        code = 'DE';
    else if (country == 'Switzerland')
        code = 'CH';
    else if (country == 'United States')
        code = 'US';
    else if (country == 'Ireland')
        code = 'IE';
    else if (country == "United Kingdom")
        code = 'GB';
    else if (country == 'Spain')
        code = 'ES'
    else if (country == 'Singapore')
        code = 'SG'
    return (
        <>
            <div className={["w-screen h-screen absolute bg-gray-400 opacity-60 top-0 left-0", beginProcess ? 'z-1' : 'z-[-1] invisible'].join(' ')}>
            </div>
            <div className={[" absolute opacity-[100%] w-screen h-screen flex justify-center items-center top-0 left-0", beginProcess ? 'z-1' : 'z-[-1] invisible'].join(' ')}>
                <div className="h-fit w-[600px] bg-slate-900 px-10 py-5 justify-center flex flex-col items-center rounded-3xl">
                    <div className='flex'>
                        <h1 className=' font-bold text-xl ml-[150px]'>Comparision between</h1>
                        <div className='ml-[150px] text-red-600 font-bold cursor-pointer' onClick={() => {
                            window.localStorage.setItem('v1', undefined)
                            window.localStorage.setItem('v2', undefined)
                            setBeginProcess(false);
                        }}>X</div>
                    </div>
                    {data.u0 != undefined ?
                        <>
                            <table className='mt-5'>
                                <tr>
                                    <th className='p-5 max-w-xs'>{data.u0.name}</th>
                                    <th>Value</th>
                                    <th className=' max-w-xs p-5'>{data.u1.name}</th>
                                </tr>
                                <tr className='text-center'>
                                    <td className={['py-3', window.localStorage.getItem('country').toLocaleLowerCase() == data.u0.country.toLowerCase() ? 'text-red-600' : ''].join(' ')}>{data.u0.country}</td>
                                    <td className='py-3'>Country</td>
                                    <td className={['py-3', window.localStorage.getItem('country').toLocaleLowerCase() == data.u1.country.toLowerCase() ? 'text-red-600' : ''].join(' ')}>{data.u1.country}</td>
                                </tr>
                                <tr className='text-center'>
                                    <td className='py-3'>{data.u0.worldRank}</td>
                                    <td className='py-3'>World Rank</td>
                                    <td className='py-3'>{data.u1.worldRank}</td>
                                </tr>
                                <tr className='text-center'>
                                    <td className={['py-3', window.localStorage.getItem('ielts').toLocaleLowerCase() == data.u0.ietls.toLowerCase() ? 'text-red-600' : ''].join(' ')}>{data.u0.ietls}</td>
                                    <td className='py-3'>IELTS</td>
                                    <td className={['py-3', window.localStorage.getItem('ielts').toLocaleLowerCase() == data.u1.ietls.toLowerCase() ? 'text-red-600' : ''].join(' ')}>{data.u1.ietls}</td>
                                </tr>
                                <tr className='text-center'>
                                    <td className='py-3'>{data.u0.stayBack}</td>
                                    <td className='py-3'>Stay Back</td>
                                    <td className='py-3'>{data.u1.stayBack}</td>
                                </tr>
                                <tr className='text-center'>
                                    <td className='py-3'>{data.u0.category}</td>
                                    <td className='py-3'>Category</td>
                                    <td className='py-3'>{data.u1.category}</td>
                                </tr>
                                <tr className='text-center'>
                                    <td className='py-3'>{data.u0.courses.length}</td>
                                    <td className='py-3'>Courses Offered</td>
                                    <td className='py-3'>{data.u1.courses.length}</td>
                                </tr>
                                <tr className='text-center'>
                                    <td className='py-3'><Link href={data.u0.url} className=' text-cyan-200'>Site</Link></td>
                                    <td className='py-3'>Website</td>
                                    <td className='py-3'><Link href={data.u1.url} className=' text-cyan-200'>Site</Link></td>
                                </tr>
                            </table>
                            {/* <div className='flex mt-7 justify-evenly w-[600px]'>
                                <h2 className='font-semibold text-base'>{data.u0.name}</h2>
                                <h2 className='font-semibold text-base'>{data.u1.name}</h2>
                            </div>
                            <div className='flex mt-2 justify-evenly w-[600px]'>
                                <h2 className='font-semibold text-base'>{data.u0.country}</h2>
                                <h2 className='font-semibold text-base'>{data.u1.country}</h2>
                            </div> */}
                        </>
                        : <></>}
                </div>
            </div>
            <div className={['flex flex-row mt-10 bg-slate-600 py-5 rounded-md', show ? styles.cardv2 : 0].join(' ')} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                {/* <div className='p-[65px] bg-white'></div> */}
                <Image src={`https://www.countryflagicons.com/FLAT/64/${code}.png`} className='ml-4' width={85} height={85} />
                <div className='text-white'>
                    <div className='w-[480px] font-bold text-xl text-center'>{uniName}</div>
                    <div className='flex flex-row justify-evenly'>
                        <div className='flex flex-col font-semibold justify-between mt-3'>
                            <div className='flex flex-row max-w-[32 0px]'><GoLocation className='mx-3' />{location}, {country}</div>
                            {ielts != undefined ? <div className='flex flex-row font-semibold'><AiOutlinePercentage className='mx-3' /> IELTS - {ielts}</div> : ''}
                            {duration != undefined ? <div className='flex flex-row font-semibold'><LuClock className='mx-3' /> Duration - {duration}</div> : ''}
                        </div>
                        <div className='flex flex-col font-semibold justify-between mt-3'>
                            <div><Link href={siteUrl}>Website</Link></div>
                            <div className=' text-red-600 cursor-pointer' onClick={() => {
                                var v1 = window.localStorage.getItem('v1');
                                var v2 = window.localStorage.getItem('v2');
                                if (v1 == 'undefined' || v1 == null) {
                                    window.localStorage.setItem('v1', id);
                                    alert(`✅ Successfully set ${uniName} to your compare list. Choose another to compare it with.`)
                                }
                                else if ((v2 == null || v2 == 'undefined') && v1 != 'undefined') {
                                    window.localStorage.setItem('v2', id);
                                    if (v1 == id) return alert("You cannot compare the same 2 universities :(");
                                    fetch('http://172.25.4.237:3000/api/compare', { method: 'GET', headers: { 'ids': [window.localStorage.getItem('v1'), window.localStorage.getItem('v2')] } }).then(re => re.json()).then(res => {
                                        console.log(res);
                                        setData(res);
                                        setBeginProcess(true);
                                    })
                                }
                                else {
                                    window.localStorage.setItem('v1', undefined);
                                    window.localStorage.setItem('v2', undefined);
                                    window.localStorage.setItem('v1', id);
                                    alert(`✅ Successfully set ${uniName} to your compare list. Choose another to compare it with.`);
                                }
                            }}>Compare</div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default UniCycler