import { useEffect, useState } from "react";

export default function FormSchedule({ formType, setMethod, selectedData }) {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const initialScheduleState = daysOfWeek.map(day => ({
        day_of_week: day,
        opening_time: '',
        closing_time: '',
        status: false
    }));

    const [form, setForm] = useState({
        restaurant_id: '',
        restaurant_schedules: initialScheduleState
    });

    const [pending, setPending] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = { restaurant_schedules: [], restaurant_schedules_count: '' };
        let isValid = true;

        let count = 0;
        form.restaurant_schedules.forEach((schedule, index) => {
            const scheduleErrors = {};

            if (schedule.status) {
                count++;

                if (!schedule.opening_time.trim()) {
                    scheduleErrors.opening_time = "Opening time is required!";
                    isValid = false;
                }

                if (!schedule.closing_time.trim()) {
                    scheduleErrors.closing_time = "Closing time is required!";
                    isValid = false;
                }

                if (schedule.opening_time && schedule.closing_time) {
                    if (schedule.closing_time <= schedule.opening_time) {
                        scheduleErrors.closing_time = "Closing time must be after opening time!";
                        isValid = false;
                    }
                }
            }

            newErrors.restaurant_schedules[index] = scheduleErrors;
        });
        if (count === 0) {
            newErrors.restaurant_schedules_count = "Minimum 1 schedule is required!"
            isValid = false;
        } else {
            newErrors.restaurant_schedules_count = null;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSetSchedule = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setPending(true);
        try {

            const formData = new FormData();
            formData.append('id', form.restaurant_id);
            formData.append('_method', 'PUT');

            form.restaurant_schedules.forEach((schedule, index) => {
                if (schedule.status) {
                    formData.append(`restaurant_schedules[${index}][day_of_week]`, schedule.day_of_week);
                    formData.append(`restaurant_schedules[${index}][opening_time]`, schedule.opening_time);
                    formData.append(`restaurant_schedules[${index}][closing_time]`, schedule.closing_time);
                }
            });

            console.log("FormData contents:");
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }


            const result = await setMethod(formData);

            if (result?.status === "success") {
                setForm({
                    restaurant_id: '',
                    restaurant_schedules: initialScheduleState
                });
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setPending(false);
        }
    };

    const handleScheduleChange = (index, field, value) => {
        const newSchedules = [...form.restaurant_schedules];

        if (field === 'status') {
            newSchedules[index] = {
                ...newSchedules[index],
                status: value,
                opening_time: value ? newSchedules[index].opening_time : '',
                closing_time: value ? newSchedules[index].closing_time : ''
            };
        } else {
            newSchedules[index] = {
                ...newSchedules[index],
                [field]: value
            };
        }

        setForm({
            ...form,
            restaurant_schedules: newSchedules
        });
    };

    useEffect(() => {
        if (formType === 'update' && selectedData) {
            const updatedSchedules = initialScheduleState.map(daySchedule => {
                const existingSchedule = selectedData.restaurant_schedules.find(
                    s => s.day_of_week === daySchedule.day_of_week
                );

                return existingSchedule ? {
                    ...daySchedule,
                    opening_time: existingSchedule.opening_time,
                    closing_time: existingSchedule.closing_time,
                    status: true
                } : daySchedule;
            });

            setForm({
                restaurant_id: selectedData.id,
                restaurant_schedules: updatedSchedules
            });
        }
    }, [selectedData, formType]);

    return (
        <div className="w-full flex flex-col gap-4">

            <form onSubmit={handleSetSchedule} encType="multipart/form-data">
                {form.restaurant_schedules.map((schedule, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-4 w-full border border-slate-300 px-4 pt-6 rounded-lg mb-4 relative pb-4">
                        {/* Day toggle */}
                        <div className="flex items-center gap-2 w-full md:w-1/4">
                            <input
                                type="checkbox"
                                id={`day-toggle-${index}`}
                                checked={schedule.status}
                                onChange={(e) => handleScheduleChange(index, 'status', e.target.checked)}
                                className="toggle toggle-primary"
                            />
                            <label htmlFor={`day-toggle-${index}`} className="font-medium">
                                {schedule.day_of_week}
                            </label>
                        </div>

                        {/* Time inputs (only show if day is active) */}
                        {schedule.status && (
                            <>
                                <div className="w-full md:w-1/3">
                                    <label htmlFor={`opening_time-${index}`} className="text-black/90 text-sm block mb-1">
                                        Opening Time<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        id={`opening_time-${index}`}
                                        value={schedule.opening_time}
                                        onChange={(e) => handleScheduleChange(index, 'opening_time', e.target.value)}
                                        className={` focus:outline-none p-2 border-solid rounded-lg h-8 w-full ${errors.restaurant_schedules?.[index]?.opening_time ? "border-red-500" : "border-slate-800/10"
                                            }`}
                                        style={{ borderWidth: 1 }}
                                    />
                                    {errors.restaurant_schedules?.[index]?.opening_time && (
                                        <span className="text-[0.70rem] text-red-500">{errors.restaurant_schedules[index].opening_time}</span>
                                    )}
                                </div>

                                <div className="w-full md:w-1/3">
                                    <label htmlFor={`closing_time-${index}`} className="text-black/90 text-sm block mb-1">
                                        Closing Time<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        id={`closing_time-${index}`}
                                        value={schedule.closing_time}
                                        onChange={(e) => handleScheduleChange(index, 'closing_time', e.target.value)}
                                        className={` focus:outline-none p-2 border-solid rounded-lg h-8 w-full ${errors.restaurant_schedules?.[index]?.closing_time ? "border-red-500" : "border-slate-800/10"
                                            }`}
                                        style={{ borderWidth: 1 }}
                                        min={schedule.opening_time}
                                    />
                                    {errors.restaurant_schedules?.[index]?.closing_time && (
                                        <span className="text-[0.70rem] text-red-500">{errors.restaurant_schedules[index].closing_time}</span>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))}

                {errors.restaurant_schedules_count && (
                    <span className="text-[0.70rem] text-red-500">{errors.restaurant_schedules_count}</span>
                )}

                <div className="flex w-full mt-4 justify-end gap-4">
                    <div
                        className="flex justify-center items-center content-center px-8 py-1 rounded-full cursor-pointer bg-slate-500 hover:bg-slate-600 transition-colors duration-500"
                        onClick={() => {
                            setForm({
                                restaurant_id: '',
                                restaurant_schedules: initialScheduleState
                            });
                            document.getElementById('modal-schedule')?.close();
                        }}
                    >
                        <span className="text-sm text-white">Back</span>
                    </div>
                    {pending ? (
                        <div className="h-8 rounded-full flex justify-center items-center cursor-pointer w-1/4 hover:bg-red-950 text-black/40 transition-colors duration-500">
                            <span className="loading loading-spinner loading-md text-white"></span>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="h-8 bg-red-700 rounded-full flex justify-center items-center cursor-pointer w-1/4 hover:bg-red-800 transition-colors duration-500"
                        >
                            <span className="text-sm text-white">Submit</span>
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}