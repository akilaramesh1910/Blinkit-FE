import React from 'react'
import { IoClose } from 'react-icons/io5'

const AddFieldComponent = ({close, value, onChange, submit}) => {
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 z-50 bg-neutral-800 bg-opacity-60 p-4 flex items-center justify-center z-50 p-4'>
        <div className='bg-white p-4 rounded w-full max-w-md'>
            <div className='flex items-center justify-between gap-3'>
                <h1 className='font-semibold'>Add Field</h1>
                <button onClick={close}>
                    <IoClose size={25} />
                </button>
            </div>
            <input 
                className='bg-blue-50 p-2 border outline-none focus-within:border-primary-200 rounded w-full my-3'
                placeholder='Enter field name'
                value={value}
                onChange={onChange}
            />
            <button
                className={`${!value ? "bg-gray-300" : "bg-primary-200 hover:bg-primary-100"} px-4 py-2 rounded mx-auto w-fit block`}
                onClick={submit}
                disabled={!value}
            >
                Add Field
            </button>
        </div>
    </section>
  )
}

export default AddFieldComponent