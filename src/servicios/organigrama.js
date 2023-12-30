import axios from 'axios';

const API_URL = 'http://localhost:3300/organigrama/';

export const getOrganigrama = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        console.error('Hubo un error al obtener los datos', error);
        throw error;
    }
}

export const getOrganigramaById = async (id) => {
    try {
        const res = await axios.get(API_URL + id);
        return res.data;
    } catch (error) {
        console.error('Hubo un error al obtener los datos', error);
        throw error; 
    }
}

export const createOrganigrama = async (organigrama) => {
    try {
        const res = await axios.post(API_URL, organigrama);
        return res.data;
    } catch (error) {
        console.error('Hubo un error al crear el nodo', error);
        throw error;
    }
}

export const updateOrganigrama = async (id, organigrama) => {
    try {
        const res = await axios.put(API_URL + id, organigrama);
        return res.data;
    } catch (error) {
        console.error('Hubo un error al actualizar el nodo', error);
        throw error;
    }
}

export const deleteOrganigrama = async (id) => {
    try {
        const res = await axios.delete(API_URL + id);
        return res.data;
    } catch (error) {
        console.error('Hubo un error al eliminar el nodo', error);
        throw error;
    }
}

export const getOrganigramaByPadre = async (id) => {    
    try {
        const res = await axios.get(API_URL + 'padre/' + id);
        return res.data;
    } catch (error) {
        console.error('Hubo un error al obtener los datos', error);
        throw error;
    }
}