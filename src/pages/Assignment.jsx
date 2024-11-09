
import Navbar from '../components/core/Navbar.jsx'
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { noScrollbarsClassName } from 'react-remove-scroll-bar'
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { v4 as uuidv4 } from 'uuid';
import Calendar from '..components/core/Calendar.jsx';
import Timer from '..components/core/Timer.jsx'
import "./App.css"


function Assignment() {

	const [form, setForm] = useState({ assignment: "", date: null });
	const [forms, setForms] = useState([]);
	const [editOn, setEditOn] = useState(false)
	const [selectedDate, setSelectedDate] = useState(null);
	const [time, setTime] = useState("00:00");
	let idx = 0;

	const handleClick = (e) => {
		if (form.assignment.length <= 3) return;

		const [h, m] = time.split(":");
		let updatedDate = new Date(form.date);
		updatedDate.setHours(h);
		updatedDate.setMinutes(m);

		if (updatedDate <= new Date()) {
			alert("The deadline is passed...")
			return;
		}

		let newForms = [...forms, { ...form, date: updatedDate, id: uuidv4() }];
		localStorage.setItem("formArray", JSON.stringify(newForms));
		setForms(newForms);
		//console.log(newForms);
		setForm({ assignment: "", date: null });
		setEditOn(false)
		setTime("00:00")
	}

	const handleTime = (e) => {
		if (form.assignment.length == 0) {
			alert("Please Enter Assignment...");
			return;
		}
		else if (form.date === null) {
			alert("Please Select Deadline...")
			return;
		}
		else {
			setTime(e.target.value)
			//console.log(e + " : " + e.target + " : " + e.target.value)

		}
	}

	const handleEdit = (id) => {
		setEditOn(true)
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

			<div className='h-[calc(100vh-64px)] w-[100vw] bg-gray-700 flex md:flex-row flex-col-reverse justify-center items-center '>
				<div className='h-full md:w-1/4 w-full flex flex-col items-center my-10'>
					<h1 className='text-white font-bold text-2xl py-3'>Add Assignment</h1>
					<div className='flex flex-col items-end'>
						<input
							className='border-1 mx-3 block h-10 w-[90%] rounded-md border border-double border-gray-800 border-transparent bg-gray-800 bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none'
							placeholder='Enter an Assignment' onChange={handleChange} type='text' value={form.assignment} name='assignment' />

						<Calendar form={form} setForm={setForm}></Calendar>

						<div className='h-10 md:w-full flex justify-center items-center'>
							<div className='text-white' htmlFor="time">Enter time : </div>

							<input type="time" className='border rounded-md h-8 w-25 mx-3' name='time' onChange={handleTime} value={time} />

						</div>
						<div className='w-full'><button disabled={form.assignment.length < 3} onClick={handleClick} className=' transition-background inline-flex h-12 mx-3 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-gray-800 bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'>
							Save
						</button></div>


					</div>
				</div>

				{/*right*/}
				<div className='h-full md:w-3/4 w-full bg-gray-100 flex flex-col justify-center items-center overflow-hidden'>
					{forms.length == 0 ? <div><div className='h-[1px] bg-white w-full'></div> <h1 className='text-4xl my-7'>No Due Assingment</h1><div className='h-[1px] bg-white w-full'></div></div> :
						<table className='table-auto rounded-md w-[90%] overflow-hidden'>
							<thead className='w-[100%] bg-black text-white'>
								<tr className='w-[100%] h-5'>
									<th>S.N.</th>
									<th>Assignment</th>

									<th>DeadLine</th>

									<th>Action</th>
									<th>Time Left</th>
								</tr>
							</thead>
							<tbody>

								{forms.map((item, index) => {
									if (1)
										return <tr className={(idx & 1) ? "bg-gray-700" : "bg-gray-500"} key={item.id}>
											<td className='text-center'>{idx++ + 1}</td>
											<td className='text-center wrapped-text'>{item.assignment}</td>
											<td className='text-center'>
												<span>
													<div>{new Date(item.date).toLocaleDateString('en-GB')}</div>
													<div>{new Date(item.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
												</span>

											</td>

											<td><span className='flex justify-center'><CiEdit className='mx-[6px] cursor-pointer' onClick={() => handleEdit(item.id)} /> <MdDelete onClick={() => handleDelete(item.id)} className='mx-[6px] cursor-pointer' /></span></td>
											<td className='flex justify-center items-center'><Timer deadlines={item.date}></Timer></td>
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

export default Assignment
