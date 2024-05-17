import { useState, useCallback, useEffect, useRef } from 'react'

function App() {


  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] =useState(false);
  const [charAllowed, setCharAllowed] =useState(false);
  const [password,setPassword]=useState("");
  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str+="0123456789";
    if (charAllowed) str+="!@#$%^&*()_+={}[]~`;:<>,./?\|";
    for (let i=1;i<=length;i++ ){
        let char = Math.floor(Math.random()*str.length+1);
        pass +=str.charAt(char);
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password]);

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  
  
  return (
    <>
      <h1 className="text-4xl text-center text-white my-4">Password Generator</h1>

      <div className="w-full max-w-md mx-auto shadow-md rounded-xl px-4 my-10 py-10 bg-gray-600">
        <div className="flex shadow rounded-xl overflow-hidden mb-4 px-5 py-10">
          <input
            type='text'
            value={password}
            className="rounded-xl outline-none w-full py-1 px-3 mr-2"
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          className='outLine-none rounded-xl bg-blue-600 text-white px-3 py-0.5 shrink-0'
          >
          copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2 fixed '>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={8}
            max={100}
            value={length}
            className='cursor-pointer' 
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label className='text-white font-semibold'>Length: {length}</label>
          </div>
          <div>
          <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{setNumberAllowed((prev)=>!prev)}}
            />
            <label htmlFor='numberInput' className='text-white font-semibold'> Numbers</label>
          </div>
          <div>
          <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={()=>{setCharAllowed((prev)=>!prev)}}
            />
            <label htmlFor='characterInput' className='text-white font-semibold'> Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
