import React, { useEffect, useState } from "react";
import UniCycler from "@/components/UniCycler";
import Head from "next/head";

const Dashboard = () => {
  const [load, setLoad] = useState(false);
  const [form, setForm] = useState({});
  const [arr, setArr] = useState([]);
  useEffect(() => {
    if (window == undefined) return;
    form.status = window.localStorage.getItem("status");
    form.country = window.localStorage.getItem("country");
    form.course = window.localStorage.getItem("course");
    form.fee = window.localStorage.getItem("fee");
    form.ielts = window.localStorage.getItem("ielts");
    fetch("http://172.25.4.237:3000/api/universities", {
      method: "POST",
      headers: {
        status: form.status,
        fees: form.fee ?? undefined,
        country: form.country ?? undefined,
        course: form.course ?? undefined,
      },
    })
      .then((re) => re.json())
      .then((res) => {
        console.log(res);
        setArr(res);
      });
  }, [form]);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="w-screen h-screen overflow-y-scroll py-10">
        <h2 className="text-center mt-[75px] font-bold text-2xl">
          List of Universities Based on your Preferences
        </h2>
        <div className="w-screen mt-[75px] flex justify-center items-center">
          <div className="flex flex-col p-10">
            {arr.map((e) => {
              return (
                <UniCycler
                  country={e.country}
                  uniName={e.name}
                  location={e.location}
                  ielts={e.ietls}
                  siteUrl={e.url}
                  key={e._id}
                  id={e._id}
                  duration={e.stayBack}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
