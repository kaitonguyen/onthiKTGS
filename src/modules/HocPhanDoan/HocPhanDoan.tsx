import Psalm from "../../assets/psalm"

const HocPhanDoan = () => {
    return (
        <div className='p-6 my-6 mx-auto container bg-white shadow rounded text-center'>
            <span className='text-2xl font-bold'>{Psalm.name}</span>
            <div className='w-96 mx-auto h-[1px] bg-slate-900 my-5'></div>
            <div className='text-start lg:w-96 mx-auto'>
                {Psalm.verses.map(verse => {
                    return (
                        <p key={'verse' + verse.number}><sup className='me-1'>{verse.number}</sup><span className='whitespace-pre-wrap'>{verse.text}</span></p>
                    )
                })}
            </div>
        </div>
    )
}

export default HocPhanDoan