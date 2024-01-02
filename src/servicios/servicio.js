import axios from 'axios';

const API_URL = 'http://localhost:3300/organigrama/';
class servicio {

    //Metodos para el CRUD

    //Metodo para obtener todos los nodos del organigrama
    static async getOrganigrama  () {
        try {
            const res = await axios.get(API_URL);
            const data = res.data;
    
            // Paso 1: Crear el objeto de mapeo
            const map = {};
            data.forEach(item => {
                map[item.id] = { ...item, children: [] };
            });
    
            // Paso 2: Construir la estructura del árbol
            let tree = [];
            data.forEach(item => {
                if (item.parent_id === null) {
                    // Este es un nodo raíz
                    tree.push(map[item.id]);
                } else {
                    // Este es un nodo hijo, añádelo a la lista de hijos de su padre
                    map[item.parent_id].children.push(map[item.id]);
                }
            });
    
            return tree;
        } catch (error) {
            console.error('Hubo un error al obtener los datos', error);
            throw error;
        }
    }
    
    //Metodo para obtener un nodo del organigrama por su id
    static async getOrganigramaById (id) {
        try {
            const res = await axios.get(API_URL + id);
            return res.data;
        } catch (error) {
            console.error('Hubo un error al obtener los datos', error);
            throw error; 
        }
    }

    //Metodo para crear un nodo del organigrama
    
    static async createOrganigrama (nodo){
        try {
            const res = await axios.post(API_URL, nodo);
            return res.data;
        } catch (error) {
            console.error('Hubo un error al crear el nodo', nodo);
            throw error;
        }
    }
    
    //Metodo para actualizar un nodo del organigrama
    static async updateOrganigrama  (id, nodo) {
        try {
            const res = await axios.put(API_URL + id, nodo);
            return res.data;
        } catch (error) {
            console.error('Hubo un error al actualizar el nodo', error);
            throw error;
        }
    }
    
    //Metodo para eliminar un nodo del organigrama
   static async deleteOrganigrama  (id)  {
        try {
            const res = await axios.delete(API_URL + id);
            return res.data;
        } catch (error) {
            console.error('Hubo un error al eliminar el nodo', error);
            throw error;
        }
    }
    

    
}
export default servicio;