import { useEffect, useState } from "react";
import Editor, {
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnUnderline,
    BtnUndo,
    Toolbar
} from 'react-simple-wysiwyg';
import GoogleMapComponent from "../api/GoogleMapsComponent";

export default function FormRestaurant({ formType, addMethod, updateMethod, selectedData }) {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const [form, setForm] = useState({
        id: '',
        name: '',
        photo: '',
        description: '',
        category: '',
    });
    const [coordinate, setCoordinate] = useState({ lat: '', long: '' })
    const [formTyping, setFormTyping] = useState({ nameTyping: false });
    const [pending, setPending] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        photo: '',
        description: '',
        lat: '',
        long: '',
        category: '',
    });

    const handleLocationSelect = (location) => {
        console.log(form, 'formformform');
        setCoordinate({
            lat: location.lat.toString(),
            long: location.lng.toString()
        });
        setErrors({
            ...errors,
            lat: '',
            long: ''
        });
    };


    const validateForm = () => {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Restaurant name is required!";
        } else if (form.name.trim().length > 200) {
            newErrors.name = "Max 200 characters!";
        }

        if (!form.photo) {
            newErrors.photo = "Restaurant photo is required!";
        }

        if (!form.description.trim()) {
            newErrors.description = "Restaurant description is required!";
        }
        
        if (!form.category.trim()) {
            newErrors.category = "Restaurant category is required!";
        }

        if (!coordinate.lat.trim() || !coordinate.long.trim()) {
            newErrors.lat = "Restaurant location is required!";
        }

        return newErrors;
    };

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);

        setForm({ ...form, photo: files[0] });
        setErrors({ ...errors, photo: "" });
    };

    const handleAddRestaurant = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            console.log(validationErrors, 'validationErrors');
            setErrors(validationErrors);
            return;
        } else {
            setErrors({});
        }

        setPending(true);
        try {

            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('description', form.description);
            formData.append('category', form.category);
            formData.append('lat', coordinate.lat);
            formData.append('long', coordinate.long);
            formData.append('photo', form.photo);

            await addMethod(formData);

            setForm({
                id: '',
                name: '',
                photo: '',
                description: '',
                category: '',
            });

            setCoordinate({
                lat: '',
                long: ''
            });
        } catch (error) {
            setForm({
                id: '',
                name: '',
                photo: '',
                description: '',
                category: '',
            });

            setCoordinate({
                lat: '',
                long: ''
            });
        } finally {
            setPending(false);
        }
    };


    const handleUpdateRestaurant = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        } else {
            setErrors({});
        }
        console.log('handleUpdateRestaurant')

        setPending(true);
        try {
            const formData = new FormData();
            formData.append('id', form.id);
            formData.append('_method', 'PUT');
            formData.append('name', form.name);
            formData.append('description', form.description);
            formData.append('category', form.category);
            formData.append('lat', coordinate.lat);
            formData.append('long', coordinate.long);
            if (form.photo instanceof File) {
                formData.append(`photo`, form.photo);
            }
            console.log('heyy');

            await updateMethod(formData);

            setForm({
                id: '',
                name: '',
                photo: '',
                description: '',
                category: '',
            });

            setCoordinate({
                lat: '',
                long: ''
            });
        } catch (error) {
            setForm({
                id: '',
                name: '',
                photo: '',
                description: '',
                category: '',
            });

            setCoordinate({
                lat: '',
                long: ''
            });
        } finally {
            setPending(false);
        }
    };

    useEffect(() => {
        if (formType === 'update' && selectedData) {
            console.log(selectedData, 'selectedData');
            setForm({
                ...selectedData,
                photo: selectedData.photo || ''
            });
            setCoordinate({ lat: selectedData.lat, long: selectedData.long })
        }
    }, [selectedData, formType]);


    return (

        <form onSubmit={formType === 'add' ? handleAddRestaurant : handleUpdateRestaurant} encType="multipart/form-data" >
            <div className="pb-1">
                <label htmlFor="name" className="text-black/90 text-sm">
                    Name<span className="text-red-500">*</span>
                </label>
            </div>
            <div className="relative pb-4">
                <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={(e) => {
                        setForm({ ...form, name: e.target.value });

                        if (e.target.value !== "" || !e.target.value) {
                            setFormTyping({ ...formTyping, nameTyping: true });
                        }
                    }}
                    className={` focus:outline-none p-4 border-solid rounded-lg h-8 w-full pr-10 ${errors.name ? "border-red-500" : "border-slate-800/10"
                        }`}
                    style={{ borderWidth: 1 }}
                />
                {errors.name && (
                    <span className="text-[0.70rem] text-red-500">{errors.name}</span>
                )}

                {
                    formTyping.nameTyping && form.name !== ''
                    &&
                    (
                        <div className="absolute right-3" onClick={() => setForm({ ...form, name: "" })} style={{ top: '0.35rem' }}>
                            <img
                                src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.4244 4.57557C23.5257 8.67683 23.5247 15.3242 19.4244 19.4244C15.3242 23.5247 8.67683 23.5257 4.57557 19.4244C0.474315 15.3232 0.475305 8.67584 4.57557 4.57557C8.67584 0.475305 15.3232 0.474315 19.4244 4.57557ZM10.5151 12L8.28778 14.2273C7.87774 14.6374 7.87774 15.3022 8.28778 15.7122C8.69782 16.1223 9.36263 16.1223 9.77267 15.7122L12 13.4849L14.2273 15.7122C14.6374 16.1223 15.3022 16.1223 15.7122 15.7122C16.1223 15.3022 16.1223 14.6374 15.7122 14.2273L13.4849 12L15.7122 9.77267C16.1223 9.36263 16.1223 8.69782 15.7122 8.28778C15.3022 7.87774 14.6374 7.87774 14.2273 8.28778L12 10.5151L9.77267 8.28778C9.36263 7.87774 8.69782 7.87774 8.28778 8.28778C7.87774 8.69782 7.87774 9.36263 8.28778 9.77267L10.5151 12Z' fill='%238E919B'/%3E%3C/svg%3E"

                                width={20}
                                height={20}
                            />
                        </div>
                    )
                }
            </div>

            <div className="pb-1">
                <label htmlFor="category" className="text-black/90 text-sm">
                    Category<span className="text-red-500">*</span>
                </label>
            </div>
            <div className="relative pb-4">
                <select 
                    value={form.category}
                    onChange={(e) => {
                        setForm({ ...form, category: e.target.value });
                    }}
                    className={` p-4 border-solid rounded-lg w-full ${
                        errors.category ? "border-red-500" : "border-slate-800/10"
                    }`}
                    style={{ borderWidth: 1 }}
                >
                    <option disabled value="">Select category</option>
                    <option value="Fine Dining">Fine Dining</option>
                    <option value="Casual Dining">Casual Dining</option>
                    <option value="Buffet">Buffet</option>
                    <option value="Cafe">Cafe</option>
                </select>
                
                {errors.category && (
                    <span className="text-[0.70rem] text-red-500">{errors.category}</span>
                )}
            </div>

            <div className="pb-1">
                <label htmlFor="description" className="text-black/90 text-sm">
                    description<span className="text-red-500">*</span>
                </label>
            </div>
            <div className="relative pb-4">
                <Editor
                    id="description"
                    value={form.description}
                    onChange={(e) => {
                        setForm({ ...form, description: e.target.value });

                        if (e.target.value !== "" || !e.target.value) {
                            setFormTyping({ ...formTyping, descriptionTyping: true });
                        }
                    }}
                    className={` focus:outline-none p-4 border-solid h-48 w-full pr-10 ${errors.description ? "border-red-500" : "border-slate-800/10"
                        }`}
                    style={{ borderWidth: 1 }}
                >
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnRedo />
                        <BtnUndo />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <BtnStrikeThrough />
                    </Toolbar>
                </Editor>

                {errors.description && (
                    <span className="text-[0.70rem] text-red-500">{errors.description}</span>
                )}

            </div>

            <div className="pb-1">
                <label htmlFor="location" className="text-black/90 text-sm">
                    Location<span className="text-red-500">*</span>
                </label>
            </div>
            <div className="relative pb-4">
                <div className="mb-2">
                    Click on the map to select the restaurant location or drag the marker to adjust.
                </div>

                {/* Google Maps Component */}
                <GoogleMapComponent
                    onLocationSelect={handleLocationSelect}
                    initialPosition={
                        coordinate.lat && coordinate.long
                            ? { lat: parseFloat(coordinate.lat), lng: parseFloat(coordinate.long) }
                            : null
                    }
                />

                {errors.lat && (
                    <span className="text-[0.70rem] text-red-500">{errors.lat}</span>
                )}
            </div>


            <div className="pb-1">
                <label htmlFor="photo" className="text-black/90 text-sm">
                    Photo<span className="text-red-500">*</span>
                </label>
            </div>
            <div className="relative pb-4">
                <input
                    type="file"
                    className={`file-input file-input-primary border-solid rounded-lg w-full ${errors.photo ? "border-red-500" : ""
                        }`}
                    accept="image/png, image/jpeg"
                    onChange={handlePhotoChange}
                />
                {errors.photo && (
                    <span className="text-[0.70rem] text-red-500">{errors.photo}</span>
                )}
            </div>


            {form.photo !== '' && (
                <div className="mt-2 gap-2 flex w-full justify-center items-center content-center">

                    <div className="relative flex w-full justify-center content-center items-center">
                        <img
                            src={form.photo instanceof File ? URL.createObjectURL(form.photo) : `http://127.0.0.1:8000/${form.photo}`}
                            alt={`Preview ${form.photo}`}
                            className="w-full h-auto rounded"
                        />

                    </div>
                </div>
            )}



            <div className="flex w-full mt-4 justify-end gap-4">
                <div className="flex justify-center items-center content-center px-8 py-1 rounded-full cursor-pointer bg-slate-500 hover:bg-slate-600 transition-colors duration-500"
                    onClick={() => {

                        setForm({
                            id: '',
                            name: '',
                            photo: '',
                            description: '',
                            category: '',
                        });

                        setCoordinate({
                            lat: '',
                            long: ''
                        });
                        document.getElementById('modal-update').close();
                        document.getElementById('modal-add').close();
                        document.getElementById('modal-delete').close();
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
                        className="h-8 bg-red-700 rounded-full flex justify-center items-center cursor-pointer  w-1/4 hover:bg-red-800 transition-colors duration-500"
                    >
                        <span className="text-sm text-white">{formType === 'add' ? "Add" : "Update"}</span>
                    </button>
                )}
            </div>
        </form>
    )
}