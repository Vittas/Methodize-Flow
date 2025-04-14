
import './App.css'

function App() {

  return (
    <>
      <div className='bg-[#172234] h-screen w-screen py-[2em] px-[15em] space-y-[2em]'>
        <h1 className='text-[2em] text-center text-white font-inter font-semibold'>Methodize Flow</h1>
        <p className='text-left text-[1.3em] text-white font-semibold font-inter'>Your tasks</p>
        
        <div className='grid grid-cols-4 gap-4 grid-rows-auto'>

          <div className='bg-[#48638E] rounded-[12px] pb-[2em] min-h-[20em]'>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            </div>
          </div>

          <div className='bg-[#48638E] rounded-[12px] pb-[2em] min-h-[20em]'>
            <div className='bg-white rounded-t-[12px] p-[1em]'>
              <h1>Title</h1>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
