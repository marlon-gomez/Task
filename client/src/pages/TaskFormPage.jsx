import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, getTask, updateTask } from "../api/task.api";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function TaskFormPage() {

    const {register, handleSubmit, formState: {
        errors
    }} = useForm();
    const navigate = useNavigate();
    const params = useParams();
    

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            console.log();
            updateTask(params.id, data)
        } else {
            await createTask(data);
            toast.success('Tarea Creada')
        }

        navigate('/tasks');
    });

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const {data: {title, description}} = await getTask(params.id);
                setValue('title', title)
                setValue('description', description)
                toast.success('Tarea Actualizada')
            }
        }
        loadTask();
    },[]);

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="title" 
                {...register('title', {required: true})}
                className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                />

                {errors.title && <span>this field is required</span>}

                <textarea rows='3' placeholder="description" 
                {...register('description', {required: true})}
                className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"></textarea>
                {errors.description && <span>Description is required</span>}
                <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>
            </form>
            {
                params.id && (<button className="bg-red-500 p-3 rounded-lg w-48 mt-3"
                    onClick={async () => {
                    const accepted = window.confirm('are you sure?');
                    if (accepted) {
                        await deleteTask(params.id);
                        toast.success('Tarea Eliminada')
                        navigate('/tasks')
                    }
                }}>Delete</button>)
            }
        </div>
    );
}