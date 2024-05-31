import React, { useState } from 'react'
import styles from '@/styles/index.module.css'

const RecyclerView = ({v1, v2, keyWord, stage}) => {
    const [val, setVal] = useState(undefined);
    return (
        <div className="h-fit w-fit bg-slate-900 px-10 py-5 justify-center flex flex-col items-center rounded-3xl">
            <h3 className="text-white text-2xl font-semibold">{v1} <span className={styles.redtext}>{keyWord}</span> {v2}</h3>
            <input className={["mt-5 max-w-[160px] bg-slate-900 pl-2 font-semibold", styles.btmborder].join(' ')} onChange={(e) => setVal(e.target.value)} />
            <div className="flex flex-row justify-evenly w-[340px]">
                <div className="mt-10 p-5 bg-green-400 rounded-full font-bold cursor-pointer px-10" onClick={() => setChange('+')}>Next</div>
                <div className={["mt-10 p-5 bg-green-400 rounded-full font-bold cursor-pointer px-7", stage > 0 ? 'visible' : 'invisible hidden'].join(' ')} onClick={() => setChange('-')}>Previous</div>
            </div>
        </div>
    )
}

export default RecyclerView