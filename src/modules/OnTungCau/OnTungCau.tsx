import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import Psalm from "../../assets/psalm";

const removePunctuation = (text: string) => {
    return text.replace(/\-/g, " ").replace(/[^\p{L}\p{N}\s]/gu, "")
        .replace(/\s+/g, " ");
}

interface VerseRange {
    from?: number
    to?: number
}

interface Verse {
    number: number
    text: string
}

interface HistoryInterface {
    verseNumber: number
    verseText: string
    isRight: boolean
}

const validateVerseNumbers = ({ from, to }: VerseRange) => {
    if (typeof from === undefined || typeof from !== 'number' || from < 1 || from > 43) {
        alert("Câu bắt đầu không hợp lệ.")
        return false;
    }
    if (to !== undefined && (typeof to !== 'number' || to < 1 || to > 43 || (from && to <= from))) {
        alert("Câu kết thúc không hợp lệ.")
        return false;
    }
    return true;
}

const OnTungCau = () => {
    const [verseRange, setVerseRange] = useState<VerseRange>({
        from: undefined,
        to: undefined,
    });
    const [showResult, setShowResult] = useState<boolean>(false)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [reviewVerse, setReviewVerse] = useState<Verse[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(1)
    const [currentVerse, setCurrentVerse] = useState<string>("");
    const [history, setHistory] = useState<HistoryInterface[]>([]);
    // const [error, setError] = useState<string>();
    const [isRight, setIsRight] = useState<boolean>();
    const [start, setStart] = useState<boolean>(false);

    const handleChangeVerseRange = (e: ChangeEvent<HTMLInputElement>) => {
        setVerseRange({
            ...verseRange,
            [e.target.name]: parseInt(e.target.value)
        })
    }

    const handleChangeVerse = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCurrentVerse(e.target?.value || "");
    }

    const checkResult = (verseNumber: number, verseText: string) => {
        if (isChecked) {
            if (!verseRange.to || (verseRange.to && currentQuestion + 1 > verseRange.to)) {
                setShowResult(true);
            } else {
                setCurrentQuestion(currentQuestion + 1);
                setCurrentVerse("")
                setIsRight(undefined)
                setIsChecked(false)
            }
        } else {
            try {
                const bibleVerseText = removePunctuation(reviewVerse[verseNumber - 1].text);
                const cleanVerseText = removePunctuation(verseText);
                // console.log(bibleVerseText);
                // console.log(cleanVerseText);

                let result = undefined;

                if (bibleVerseText === cleanVerseText) {
                    result = true;
                } else {
                    result = false
                }

                setIsChecked(true);
                setIsRight(result);
                setHistory([...history, {
                    verseNumber,
                    verseText,
                    isRight: result
                }])

            } catch (error) {
                console.log(error)
                if (error instanceof Error) {
                    alert(error.message)
                }
            }
        }
    }

    const handleKeyDown = (e: any) => {
        switch (e.key) {
            case "Enter":
                checkResult(currentQuestion, currentVerse)
                break;
            default:
                // console.log(e.key);
                break;
        }
    }

    const handleClick = () => {
        checkResult(currentQuestion, currentVerse)
    }

    const resetGame = () => {
        setVerseRange({
            from: undefined,
            to: undefined
        })
        setCurrentVerse("")
        setHistory([])
        // setError(undefined)
        setIsRight(undefined)
        setIsChecked(false)
        setShowResult(false)
    }

    const toggleGame = async () => {
        if (!start) {
            const isValid = validateVerseNumbers({ from: verseRange?.from, to: verseRange?.to });
            if (!isValid) return
            const verses = Psalm.verses.filter(({ number }) => {
                if (!verseRange?.to) {
                    return number === verseRange.from;
                }
                return verseRange?.from && number >= verseRange.from && number <= verseRange?.to
            });
            setReviewVerse([...verses]);
        } else {
            resetGame();
        }
        setStart(!start);
    }

    return (
        <>
            {
                showResult ? (
                    <>
                        <div className='px-6 mt-6 mx-auto container'>
                            <div className="bg-white dark:bg-slate-900 shadow rounded p-6">
                                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                                    {
                                        history.map((item: HistoryInterface, idx: number) => {
                                            return (
                                                <li key={'history' + item.verseNumber} className="mb-10 ms-4">
                                                    <span className={clsx("absolute flex items-center justify-center w-6 h-6  rounded-full -start-3 ring-8 ring-white dark:ring-gray-900",
                                                        {
                                                            "bg-success-100": item.isRight
                                                        },
                                                        {
                                                            "bg-rose-100": !item.isRight
                                                        }
                                                    )}>
                                                        {
                                                            item.isRight ?
                                                                (

                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-rosette-discount-check text-green-600"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" /><path d="M9 12l2 2l4 -4" /></svg>
                                                                ) :
                                                                (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-x text-rose-700"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10l4 4m0 -4l-4 4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
                                                                )
                                                        }
                                                    </span>
                                                    <span className="ms-5">Thi thiên 107:{item.verseNumber}</span>
                                                    <p><span>Trả lời: </span><span className={clsx("ms-2 px-2 rounded",
                                                        {
                                                            "bg-green-200 text-green-700": item.isRight
                                                        },
                                                        {
                                                            "bg-rose-200 text-rose-700": !item.isRight
                                                        }
                                                    )}>{item.verseText}</span></p>
                                                    <p><span>Đáp án: </span><span className="ms-2">{reviewVerse[idx].text}</span></p>
                                                </li>
                                            )
                                        })
                                    }
                                </ol>
                                <button className={clsx('capitalize inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-4 text-white ring-1 ring-slate-900/10 bg-sky-600 hover:bg-gray-300 hover:ring-slate-900/15 hover:text-slate-900 disabled:cursor-not-allowed')} onClick={() => { setStart(false); resetGame(); }}>Làm lại</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='px-6 my-6 mx-auto container'>
                            <div className="bg-white dark:bg-slate-900 shadow rounded p-6">
                                <div className='flex items-center space-x-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg >
                                    <span>Hướng dẫn:</span>
                                </div >
                                <ul className='ms-6'>
                                    <li>- Chọn phần Kinh Thánh muốn kiểm tra. Bỏ trống ô "Câu kết thúc" nếu chỉ muốn ôn 1 câu.</li>
                                    <li>- Nhập đầy đủ từng câu theo thứ tự.</li>
                                    <li>- Không cần chính xác dấu câu, nhưng bắt buộc đúng chính tả và viết hoa - thường. <strong>!!!Lưu ý: Đây là cách tính của app, không nhất thiết của Ban HKT.</strong></li>
                                </ul>
                            </div>
                        </div >

                        <div className='px-6 my-6 mx-auto container'>
                            <div className="bg-white dark:bg-slate-900 shadow rounded p-6">
                                <div className="flex items-center">
                                    <span>Tôi muốn ôn từ câu</span>
                                    <input type="number" name="from" min={1} max={43} className="lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm ms-2 py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700" autoComplete="off" placeholder="Câu bắt đầu" onChange={handleChangeVerseRange} value={verseRange.from || ""} readOnly={start} />
                                    <span className="ms-2">đến câu</span>
                                    <input type="number" name="to" min={1} max={43} className="lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm ms-2 py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700" autoComplete="off" placeholder="Câu kết thúc" onChange={handleChangeVerseRange} value={verseRange.to || ""} readOnly={start} />
                                </div>
                                <div className="flex justify-end space-x-2 mt-2">
                                    {
                                        !start ? (
                                            <button className={clsx('capitalize inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-4 text-white ring-1 ring-slate-900/10 bg-sky-600 hover:bg-gray-300 hover:ring-slate-900/15 hover:text-slate-900 disabled:cursor-not-allowed')} disabled={!verseRange || !verseRange.from} onClick={toggleGame}>Bắt đầu</button>
                                        ) :
                                            (
                                                <button className={clsx('capitalize inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-4 text-white ring-1 ring-slate-900/10 bg-rose-600 hover:bg-gray-300 hover:ring-slate-900/15 hover:text-slate-900')} onClick={toggleGame}>Kết thúc</button>
                                            )
                                    }
                                </div>
                            </div>
                        </div>

                        {
                            start && isRight !== undefined ?
                                (
                                    <div className="px-6 my-6 mx-auto container">
                                        <div className={clsx("shadow rounded text-white bg-contain bg-right bg-no-repeat p-6",
                                            {
                                                "bg-green-500 bg-[url('https://tabler.io/_next/image?url=%2Fillustrations%2Flight%2Fgood-news.png&w=800&q=75')]": isRight
                                            },
                                            {
                                                "bg-rose-500 bg-[url('https://tabler.io/_next/image?url=%2Fillustrations%2Flight%2Fbad-news.png&w=800&q=75')]": !isRight
                                            },
                                        )}>
                                            <h3 className="text-lg flex items-center">{isRight ?
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-rosette-discount-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" /><path d="M9 12l2 2l4 -4" /></svg>
                                                    <span className="ms-2">Chính xác!</span>
                                                </>
                                                :
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mood-tongue-wink"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 10h.01" /><path d="M10 14v2a2 2 0 0 0 4 0v-2" /><path d="M15.5 14h-7" /><path d="M17 10c-.5 -1 -2.5 -1 -3 0" /></svg>
                                                    <span className="ms-2">Sai sai sai...</span>
                                                </>
                                            }</h3>
                                            <p>Thi thiên 107:{reviewVerse[currentQuestion - 1].number}</p>
                                            <span className="whitespace-pre-wrap">{reviewVerse[currentQuestion - 1].text}</span>
                                        </div>
                                    </div>
                                ) : null
                        }

                        {
                            start && reviewVerse[currentQuestion - 1] ? (
                                <>
                                    <div className="px-6 my-6 mx-auto container">
                                        <div className='bg-white dark:bg-slate-900 shadow rounded p-6'>
                                    {/* PC */}
                                            <div className="flex items-center">
                                                <label className="font-bold border-b-2 border-dashed border-sky-600 text-sky-600 hover:cursor-pointer" onClick={() => alert(reviewVerse[currentQuestion - 1].text)}>Thi thiên 107:{reviewVerse[currentQuestion - 1].number}</label>
                                                <span className="text-sm ms-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-hand-finger-left">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M12 8h-8.5a1.5 1.5 0 0 0 0 3h7.5" />
                                                        <path d="M10.5 11h-2a1.5 1.5 0 1 0 0 3h2.5" />
                                                        <path d="M9.5 14a1.5 1.5 0 0 0 0 3h1.5" />
                                                        <path d="M10.5 17a1.5 1.5 0 0 0 0 3h4.5a6 6 0 0 0 6 -6v-2v.208a6 6 0 0 0 -2.7 -5.012l-.3 -.196q -.718 -.468 -5.728 -3.286a1.5 1.5 0 0 0 -2.022 .536a1.87 1.87 0 0 0 .28 2.28l1.47 1.47" />
                                                    </svg>
                                                </span>
                                                <i>(Click vào để ôn lại)</i>
                                            </div>
                                            <input type="text" id="verse-txt" className="w-full hidden md:block mt-2 px-2 py-10 ring-1 ring-slate-900/10 shadow-sm rounded-md dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 text-xl" onKeyDown={handleKeyDown} onChange={handleChangeVerse} value={currentVerse} autoComplete="off" autoFocus readOnly={isChecked} />
                                            <span className="mt-2 hidden lg:block">Nhấn phím Enter để kiểm tra và nhấn Enter một lần nữa để sang câu tiếp theo.</span>
                                            <textarea className="w-full md:hidden mt-2 px-2 py-2 ring-1 ring-slate-900/10 shadow-sm rounded-md dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 text-xl" rows={7} onChange={handleChangeVerse} value={currentVerse} autoComplete="off" autoFocus readOnly={isChecked}></textarea>
                                            <div className="flex lg:hidden">
                                                <button type="button" className={clsx('capitalize inline-flex justify-center rounded-lg text-sm font-semibold mt-2 py-3 px-4 text-white ring-1 ring-slate-900/10 bg-sky-600 hover:bg-gray-300 hover:ring-slate-900/15 hover:text-slate-900')} onClick={handleClick}>
                                                    {isChecked ? "Tiếp tục" : "Kiểm tra"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                                : null
                        }
                    </>
                )
            }

        </>
    )
}

export default OnTungCau;