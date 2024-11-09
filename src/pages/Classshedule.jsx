
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { noScrollbarsClassName } from 'react-remove-scroll-bar'
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../components/core/Navbar'

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const times = Array.from({ length: 24 }, (_, index) => index);

function Classshedule() {


	const [form, setForm] = useState({ class: "", day: "Sunday", time: 0, });
	const [forms, setForms] = useState([]);
	const [arrowTogle, setarrowTogle] = useState(false)
	const [selectedDay, setSelectedDay] = useState("Any");
	let idx = 0;

	const handleClick = (e) => {
		if (form.class.length <= 3) return;
		let newForms = [...forms, { ...form, id: uuidv4() }];
		localStorage.setItem("formArray", JSON.stringify(newForms));
		setForms(newForms);
		console.log(forms);
		setForm({ class: "", day: "Sunday", time: "0" });
	}

	const handleEdit = (id) => {
		let idx = forms.findIndex(item => item.id === id);
		setForm(forms[idx]);
		setForms(forms.filter(item => item.id != id));
	}

	const handleDelete = (id) => {
		let idx = forms.findIndex(item => item.id === id);
		setForms(forms.filter(item => item.id != id));
		localStorage.setItem("formArray", JSON.stringify(forms.filter(item => item.id != id)));
	}

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })

	}

	useEffect(() => {
		let f = localStorage.getItem("formArray");

		if (f) {
			setForms(JSON.parse(f))
		}
	}, [])

	return (
		<>
			<div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
			<Navbar />

			{/*body*/}

			<div className='h-[calc(100vh-64px)] w-[100vw] bg-gray-700 flex md:flex-row flex-col-reverse justify-center items-center '>
				<div className='h-full md:w-1/4 w-full flex flex-col items-center my-10'>
					<h1 className='text-white font-bold text-2xl py-3'>Add Classes</h1>
					<div className='flex flex-col items-end'>
						<input
							className='border-1 mx-3 block h-10 w-[90%] rounded-md border border-double border-gray-800 border-transparent bg-gray-800 bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none'
							placeholder='Enter Class' onChange={handleChange} type='text' value={form.class} name='class' />

						<div className='flex justify-center items-center my-4'>
							<h1 className='text-white'>Select a Day  :  </h1>
							<select onChange={handleChange}
								className='bg-gray-800 text-white h-10 w-auto mx-3 focus:bg-black rounded-lg' name='day' value={form.day}>
								{days.map((day, index) => {
									return <option key={index} value={day}>{day}</option>
								})}
							</select>
						</div>


						<div className='flex justify-center items-center my-4'>
							<h1 className='text-white'>From  :  </h1>
							<select onChange={handleChange} className='scroll bg-gray-800 text-white h-10 w-auto mx-3 focus:bg-black rounded-lg' name='time' value={form.time}>
								{times.map((time, index) => {
									return <option key={index} value={time}>{time}</option>
								})}
							</select>
						</div>


						<div className='w-full'><button disabled={form.class.length < 3} onClick={handleClick} className=' transition-background inline-flex h-12 mx-3 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-gray-800 bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'>
							Save
						</button></div>




					</div>
				</div>

				{/*right*/}
				<div className='h-full md:w-3/4 w-full bg-gray-300 flex flex-col justify-center items-center'>
					{forms.length == 0 ? <div><div className='h-[1px] bg-white w-full'></div> <h1 className='text-4xl my-7'>No Classsss</h1><div className='h-[1px] bg-white w-full'></div></div> :
						<table className='table-auto rounded-md w-[90%] overflow-hidden'>
							<thead className='w-[100%] bg-black text-white'>
								<tr className='w-[100%] h-5'>
									<th>S.N.</th>
									<th>Class</th>
									<th> <span className='inline-flex items-center'>Day <span onClick={() => setarrowTogle(!arrowTogle)} className='ml-1 inline-block cursor-pointer'>{arrowTogle ? <FaSortUp /> : <FaSortDown />}{arrowTogle && <div className='rounded-md flex flex-col my-1 w-auto z-4 absolute bg-gray-800 tet-white'><div onClick={() => setSelectedDay("Any")} className='w-auto py-[1px] rounded-md'>{"Any"}</div>{days.map((item, index) => { return <div onClick={() => setSelectedDay(item)} className='w-auto py-[1px] rounded-md' key={index}>{item}</div> })}</div>}</span></span></th>
									<th>Time</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>

								{forms.map((item, index) => {
									if (selectedDay === "Any" || selectedDay === item.day)
										return <tr className={(idx & 1) ? "bg-gray-700" : "bg-gray-500"} key={item.id}>
											<td className='text-center'>{idx++ + 1}</td>
											<td className='text-center wrapped-text'>{item.class}</td>
											<td className='text-center'>{item.day}</td>
											<td className='text-center'>{parseInt(item.time) < 12 ? item.time : parseInt(item.time) % 12}:00 {parseInt(item.time) < 12 ? "AM" : "PM"}</td>
											<td><span className='flex justify-center'><CiEdit className='mx-[6px] cursor-pointer' onClick={() => handleEdit(item.id)} /> <MdDelete onClick={() => handleDelete(item.id)} className='mx-[6px] cursor-pointer' /></span></td>
										</tr>
								})}
							</tbody>
						</table>
					}
				</div>
			</div>
		</>
	)
}

export default Classshedule
