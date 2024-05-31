import Head from "next/head";
import styles from '@/styles/index.module.css'
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import RecyclerView from "@/components/RecyclerView";
import { TiCancel } from 'react-icons/ti'

export default function Home() {
  const [show, setShow] = useState([1, 0, 0]);
  const [data, setData] = useState(undefined);
  const [beginProcess, setBeginProcess] = useState(false);
  const beginBtn = useRef(undefined);
  const [anii, setAnii] = useState(false);
  const [form, setForm] = useState({});
  const [val, setVal] = useState("");
  const [stage, setStage] = useState(0);
  const [change, setChange] = useState(undefined);
  const [v1, setV1] = useState("Which");
  const [v2, setV2] = useState("do you prefer?");
  const [keyWord, setKeyWord] = useState("course");
  const [nal, setNal] = useState("");

  useEffect(() => {
    console.log(stage);
    if (stage == 0) {
      setV1("Which");
      setV2("do you prefer?");
      setKeyWord("course");
      setVal(form.course ?? '');
    }
    console.log(stage);
    if (stage == 1) {
      form.course = form.course ?? val;
      setV1("Which");
      setV2("do you prefer?");
      setKeyWord("country");
      // setStage(stage + 1);
      setVal(form.country ?? '');
    }
    else if (stage == 2) {
      form.country = form.country ?? val;
      setV1("What is your")
      setKeyWord("IETLS");
      setV2("marks?")
      // setStage(stage + 1);
      setVal(form.ielts ?? '');
    }
    else if (stage == 3) {
      form.ielts = form.ielts ?? val;
      setV1("What is your preferred")
      setKeyWord("annual fee");
      setV2("?");
      // setStage(stage + 1);
      setVal(form.fee ?? '');
    }
    else if (stage == 4) {
      form.fee = form.fee ?? val;
      window.localStorage.setItem('course', form.course);
      window.localStorage.setItem('country', form.country);
      window.localStorage.setItem('ielts', form.ielts);
      window.localStorage.setItem('fee', form.fee);
      window.localStorage.setItem('status', 0);
      window.location.href = "/dashboard";
    }

    console.log(form, stage);
  }, [stage]);

  useEffect(() => {
    if (beginBtn.current != undefined)
      beginBtn.current.addEventListener('click', () => {
        setBeginProcess(true);
      })
  })
  // function reRender(ll) {
  //   //When none is selected
  //   if ((ll == 0 && show[0] == 1) || (ll == 1 && show[1] == 1)) {
  //     setData(
  //       <>
  //         <h2 className="text-center mt-[180px] font-semibold text-2xl">Choose an option to proceed</h2>
  //       </>
  //     )
  //   }
  //   //When option 1 is clicked
  //   else if (ll == 0) {
  //     setData(
  //       <>
  //         <div className="flex flex-col items-center mt-[180px]">
  //           <h3 className=" text-center font-semibold text-2xl">Enter your <span className={styles.redtext}>Preferences</span></h3>
  //           <h3 className=" text-center font-semibold text-2xl m-1">Best <span className={styles.redtext}>UNIs</span> found in the world</h3>
  //           <h3 className=" text-center font-semibold text-2xl m-1"></h3>
  //           <div className=" text-center p-5 bg-green-500 w-fit m-3 rounded-full font-bold text-lg px-10 cursor-pointer" ref={beginBtn}>Begin</div>
  //         </div>
  //       </>
  //     )
  //   }
  //   //When option 2 is clicked
  //   else if (ll == 1) {
  //     console.log("in opt 2");
  //     setData(
  //       <>
  //         <h3 className="text-center font-semibold text-2xl mt-10">Choose the <span className={styles.redtext}>UNIs</span> from around the Globe</h3>
  //         <div className="w-screen flex justify-center pb-[150px]">
  //           <Image onMouseLeave={() => setAnii(false)} onMouseEnter={() => { console.log(anii); setAnii(true); console.log(anii) }} className={anii ? styles.anii : 0} src={'/images/map1.jpeg'} alt="World Map" width={600} height={500} />
  //         </div>
  //       </>
  //     )
  //   }
  // }
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <div className={["w-screen h-screen absolute bg-gray-400 opacity-60", beginProcess ? 'z-1' : 'z-[-1]'].join(' ')}>
      </div>
      <div className={[" absolute opacity-[100%] w-screen h-screen flex justify-center items-center", beginProcess ? 'z-1' : 'z-[-1]'].join(' ')}>
        <div className="h-fit w-fit bg-slate-900 px-10 py-5 justify-center flex flex-col items-center rounded-3xl">
          <div className=" flex flex-row">
            <h3 className="text-white text-2xl font-semibold">{v1} <span className={styles.redtext}>{keyWord}</span> {v2}</h3>
            <div className="font-semibold text-[#FF0000] mx-5 text-2xl cursor-pointer" onClick={() => { setBeginProcess(false);form.course = undefined; form.country = undefined;  }}>X</div>
          </div>
          <input className={["mt-5 w-[240px] bg-slate-900 pl-2 font-semibold", styles.btmborder].join(' ')} value={val} onChange={(e) => setVal(e.target.value)} />
          <div className="flex flex-row justify-evenly w-[340px]">
            <div className="mt-10 p-5 bg-green-400 rounded-full font-bold cursor-pointer px-10" onClick={() => setStage(stage + 1)}>Next</div>
            <div className={["mt-10 p-5 bg-green-400 rounded-full font-bold cursor-pointer px-7", stage > 0 ? 'visible' : 'invisible hidden'].join(' ')} onClick={() => setStage(stage - 1)}>Previous</div>
          </div>
        </div>
      </div>
      <div className={[" w-screen h-screen z-1", styles.divbg].join(' ')}>
        <h1 className=" text-orange-700 font-bold mb-5 text-center mt-5 text-7xl py-5">FindMyUni</h1>
        <div className=" justify-evenly flex items-center h-fit-content flex-row">
          <div className={[" p-5 rounded-[5px] font-bold cursor-pointer bg-gray-700", show[0] ? styles.card : 0].join(' ')} onClick={() => {
            console.log(show)
            setShow([1, 0, 0]);
            console.log(show)
          }}>
            Preferences
          </div>
          <div className={[" p-5 rounded-[5px] font-bold cursor-pointer bg-gray-700", show[2] ? styles.card : 0].join(' ')} onClick={() => {
            console.log(show);
            setShow([0, 0, 1]);
            console.log(show);
          }}>
            Natural Language
          </div>
          <div className={[" p-5 rounded-[5px] font-bold cursor-pointer bg-gray-700", show[1] ? styles.card : 0].join(' ')} onClick={() => {
            console.log(show);
            setShow([0, 1, 0]);
            console.log(show);
          }}>
            World Map
          </div>
        </div>
        <div className="w-screen mt-5 h-fit flex justify-center flex-col">
          {
            show[0] == 1 ? <>
              <div className="flex flex-col items-center mt-[180px]">
                <h3 className=" text-center font-semibold text-2xl">Enter your <span className={styles.redtext}>Preferences</span></h3>
                <h3 className=" text-center font-semibold text-2xl m-1">Best <span className={styles.redtext}>UNIs</span> found in the world</h3>
                <h3 className=" text-center font-semibold text-2xl m-1"></h3>
                <div className=" text-center p-5 bg-green-500 w-fit m-3 rounded-full font-bold text-lg px-10 cursor-pointer" ref={beginBtn}>Begin</div>
              </div></> : show[1] == 1 ?
              <>
                <h3 className="text-center font-semibold text-2xl mt-10">Choose the <span className={styles.redtext}>UNIs</span> from around the Globe</h3>
                <div className="w-screen flex justify-center pb-[150px]">
                  <Image onMouseLeave={() => setAnii(false)} onMouseEnter={() => { console.log(anii); setAnii(true); console.log(anii) }} className={["mt-[150px]", anii ? styles.anii : 0].join(' ')} src={'/images/map1.jpeg'} alt="World Map" width={600} height={500} onClick={() => {
                    window.location.href = "/maps"
                  }} />
                </div>
              </> : <>
                <div className="w-screen h-screen flex justify-center mt-[100px]">
                  <div className={["w-[560px] h-[320px] flex flex-col items-center justify-evenly", styles.cardv3].join(' ')}>
                    <input onChange={(e) => setNal(e.target.value)} className=" bg-slate-700 rounded-lg h-fit w-[400px] mt-7 p-5 font-semibold text-lg" value={nal} placeholder="Enter your query" />
                    <div className=" p-5 rounded-xl font-semibold bg-green-400 cursor-pointer" onClick={() => {
                      if (nal.toString().trim() == '') alert("The query string cannot be empty");
                      fetch('/api/gpt', { method: 'POST', headers: { 'query': nal.toString() } }).then(re => re.json()).then(res => {
                        window.localStorage.setItem('course', res.res.course);
                        window.localStorage.setItem('country', res.res.country);
                        window.localStorage.setItem('ielts', res.res.marks);
                        window.localStorage.setItem('fee', res.res.fee_structure);
                        window.localStorage.setItem('status', 0);
                        window.location.href = '/dashboard';
                      })
                    }}>Submit</div>
                  </div>
                </div>
              </>
          }
        </div>
      </div>
    </>
  );
}
