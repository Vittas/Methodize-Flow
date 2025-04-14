interface ModalProps {
    visibility: boolean
    setVisibility: (v: boolean) => void
  }
  
  export const ModalCreateTaskButton = ({ visibility, setVisibility }: ModalProps) => {
    if (!visibility) return null;
  
    const closeModal = () => {
      setVisibility(false)
    }
  
    return (
      <div
        className="bg-black/40 w-screen h-screen cursor-pointer absolute flex justify-center self-start py-[10em]"
        onClick={closeModal}
      >
        <div
          className="bg-[#48638E] absolute p-[2em] max-w-[80em] max-h-[20em] space-y-[1em] rounded-[12px]"
          onClick={(e) => e.stopPropagation()} // impede que o clique dentro do modal feche ele
        >
          <h1 className="text-white font-semibold text-center">CREATE A CARD</h1>
  
          <div>
            <input className="rounded-[12px] px-[1em] py-[0.5em]" type="text" placeholder="Type a title..." />
          </div>
  
          <input className="rounded-[12px] pb-[2em] px-[1em] pt-[0.5em]" type="text" placeholder="Type a description..." />
  
          <div className="flex justify-center space-x-[3em]">
            <input className="w-4 h-4" type="checkbox" name="Low" />
            <input type="checkbox" name="Medium" />
            <input type="checkbox" name="High" />
          </div>
  
          <div className="flex justify-center">
            <button
              className="bg-[#94ACDB] text-white font-semibold px-[1em] py-[0.5em] rounded-[12px]"
              onClick={closeModal}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    )
  }
  