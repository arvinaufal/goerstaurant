import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";

export default function FormMenu({ formType, setMethod, selectedData }) {
    const [form, setForm] = useState({
        restaurant_id: '',
        menus: [{ name: '', price: '' }]
    });
    const [formTyping, setFormTyping] = useState([]);
    const [pending, setPending] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = { menus: [] };
        let isValid = true;

        form.menus.forEach((menu, index) => {
            const menuErrors = {};

            if (!menu.name.trim()) {
                menuErrors.name = "Menu name is required!";
                isValid = false;
            } else if (menu.name.trim().length > 200) {
                menuErrors.name = "Max 200 characters!";
                isValid = false;
            }

            if (!menu.price.toString().trim()) {
                menuErrors.price = "Price is required!";
                isValid = false;
            } else if (isNaN(menu.price) || Number(menu.price) <= 0) {
                menuErrors.price = "Must be a number greater than 0!";
                isValid = false;
            }

            newErrors.menus[index] = menuErrors;
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSetMenu = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setPending(true);
        try {
            const formData = new FormData();
            formData.append('id', form.restaurant_id);
            formData.append('_method', 'PUT');

            form.menus.forEach((menu, index) => {
                formData.append(`menus[${index}][name]`, menu.name);
                formData.append(`menus[${index}][price]`, menu.price);
            });

            console.log("FormData contents:");
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const result = await setMethod(formData);

            if (result?.status === "success") {
                setForm({ restaurant_id: '', menus: [{ name: '', price: '' }] });
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setPending(false);
        }
    };

    const addMenu = () => {
        setForm({
            ...form,
            menus: [...form.menus, { name: '', price: '' }]
        });
        setFormTyping([...formTyping, { nameTyping: false }]);
    };

    const removeMenu = (index) => {
        if (form.menus.length <= 1) return;

        const newMenus = [...form.menus];
        newMenus.splice(index, 1);

        const newFormTyping = [...formTyping];
        newFormTyping.splice(index, 1);

        setForm({ ...form, menus: newMenus });
        setFormTyping(newFormTyping);

        const newErrors = { ...errors };
        if (newErrors.menus) {
            newErrors.menus.splice(index, 1);
            setErrors(newErrors);
        }
    };

    const handleMenuChange = (index, field, value) => {
        const newMenus = [...form.menus];
        newMenus[index][field] = value;
        setForm({ ...form, menus: newMenus });

        if (field === 'name' && (value !== "" || !value)) {
            const newFormTyping = [...formTyping];
            newFormTyping[index] = { ...newFormTyping[index], nameTyping: true };
            setFormTyping(newFormTyping);
        }
    };

    useEffect(() => {
        if (formType === 'update' && selectedData) {
            console.log(selectedData, 'selectedDataselectedDataselectedData')
            setForm({
                restaurant_id: selectedData.id,
                menus: selectedData.menus.length > 0 ? selectedData.menus : [{ name: '', price: '' }]
            });

            setFormTyping(Array(selectedData.menus.length || 1).fill({ nameTyping: false }));
        }
    }, [selectedData, formType]);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-4">

                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Menus</h3>
                    <button
                        type="button"
                        onClick={addMenu}
                        className="rounded-full bg-blue-500 text-white py-1 px-4 hover:bg-blue-600 transition-colors"
                    >
                        Add Menu
                    </button>
                </div>

                <form onSubmit={handleSetMenu} encType="multipart/form-data">
                    {form.menus.map((menu, index) => (
                        <div key={index} className="border border-slate-300 px-4 pt-6 rounded-lg mb-4 relative pb-4">
                            {form.menus.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeMenu(index)}
                                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                    <FaTrash />
                                </button>
                            )}

                            <div className="pb-1">
                                <label htmlFor={`name-${index}`} className="text-black/90 text-sm">
                                    Name<span className="text-red-500">*</span>
                                </label>
                            </div>
                            <div className="relative pb-4">
                                <input
                                    type="text"
                                    id={`name-${index}`}
                                    value={menu.name}
                                    onChange={(e) => handleMenuChange(index, 'name', e.target.value)}
                                    className={` focus:outline-none p-4 border-solid rounded-lg h-8 w-full pr-10 ${errors.menus?.[index]?.name ? "border-red-500" : "border-slate-800/10"
                                        }`}
                                    style={{ borderWidth: 1 }}
                                />
                                {formTyping[index]?.nameTyping && menu.name !== '' && (
                                    <div
                                        className="absolute right-3"
                                        onClick={() => handleMenuChange(index, 'name', "")}
                                        style={{ top: '0.35rem' }}
                                    >
                                        <img
                                            src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.4244 4.57557C23.5257 8.67683 23.5247 15.3242 19.4244 19.4244C15.3242 23.5247 8.67683 23.5257 4.57557 19.4244C0.474315 15.3232 0.475305 8.67584 4.57557 4.57557C8.67584 0.475305 15.3232 0.474315 19.4244 4.57557ZM10.5151 12L8.28778 14.2273C7.87774 14.6374 7.87774 15.3022 8.28778 15.7122C8.69782 16.1223 9.36263 16.1223 9.77267 15.7122L12 13.4849L14.2273 15.7122C14.6374 16.1223 15.3022 16.1223 15.7122 15.7122C16.1223 15.3022 16.1223 14.6374 15.7122 14.2273L13.4849 12L15.7122 9.77267C16.1223 9.36263 16.1223 8.69782 15.7122 8.28778C15.3022 7.87774 14.6374 7.87774 14.2273 8.28778L12 10.5151L9.77267 8.28778C9.36263 7.87774 8.69782 7.87774 8.28778 8.28778C7.87774 8.69782 7.87774 9.36263 8.28778 9.77267L10.5151 12Z' fill='%238E919B'/%3E%3C/svg%3E"
                                            alt="Clear"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                )}
                                {errors.menus?.[index]?.name && (
                                    <span className="text-[0.70rem] text-red-500">{errors.menus[index].name}</span>
                                )}
                            </div>

                            <div className="pb-1">
                                <label htmlFor={`price-${index}`} className="text-black/90 text-sm">
                                    Price<span className="text-red-500">*</span>
                                </label>
                            </div>
                            <div className="relative pb-4">
                                <input
                                    type="number"
                                    min={0}
                                    id={`price-${index}`}
                                    value={menu.price}
                                    onChange={(e) => handleMenuChange(index, 'price', e.target.value)}
                                    className={` focus:outline-none p-4 border-solid rounded-lg h-8 w-full ${errors.menus?.[index]?.price ? "border-red-500" : "border-slate-800/10"
                                        }`}
                                    style={{ borderWidth: 1 }}
                                />
                                {errors.menus?.[index]?.price && (
                                    <span className="text-[0.70rem] text-red-500">{errors.menus[index].price}</span>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="flex w-full mt-4 justify-end gap-4">
                        <div
                            className="flex justify-center items-center content-center px-8 py-1 rounded-full cursor-pointer bg-slate-500 hover:bg-slate-600 transition-colors duration-500"
                            onClick={() => {
                                setForm({ restaurant_id: '', menus: [{ name: '', price: '' }] });
                                document.getElementById('modal-menu')?.close();
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
        </div>
    );
}