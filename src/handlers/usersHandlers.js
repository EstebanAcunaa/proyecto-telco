import { required } from "joi";

export const getAllUsers = (req, res) =>{
    res.status(200).json({
        message: 'Lista de usuarios obtenida correctamente',
        count: users.length,
        data: users
    });
};


//Obtener los usuarios por ID

export const getUserById = (req, res) =>{
    const {id} = req.params;
    const user = users.find(u => u.id === parseInt(id));
    if(!user){
        return res.status(404).json({
            message: 'Usuario no encontrado',
            id: id
        });
    }
    res.status(200).json({
        message: 'Usuario encontrado',
        data: user
    });
};


//POST Crear un nuevo usuario

export const createUser = (req, res) =>{
    const{name, mail, role} = req.body;

    if(!name || !mail){
        return res.status(400).json({
            message: 'Faltan campos obligatorios',
            required: ['name', 'mail']
        });
    }
    const newUser ={
        id: users.length > 0 ? Math.max(...users.map(u=> u.id)) + 1 : 1,
        name, 
        mail,
        role: role || 'user'
    };
    users.push(201).json({
        message: 'Usuario nuevo creado exitosamente',
        data: newUser
    });
};

export const updateUser = (req, res) =>{
    const {id} = req.params;
    const {name, mail, role} = req.body;
    
    const userIndex = users.findIndex(u => u.id === parseInt(id));

    if(userIndex === -1){
        return res.status(404).json({
            message: 'Usuario no encontrado',
            id: id
        });
    }

    users[userIndex] = {
        ...user[userIndex],
        ...(name && {name}),
        ...(mail && {mail}),
        ...(role && {role})
    };
    res.status(200).json({
        message: 'Usuario actualizado correctamente',
        data: users[userIndex]
    });
};

export const deleteUser = (req, res) => {
    const {id} = req.params;
    const userIndex = users.findIndex(u=> u.id === parseInt(id));

    if (userIndex === -1){
        return res.status(404).json({
            message: 'Usuario no encontrado',
            id: id
        });
    }
    const deletedUser = users[userIndex];
    users = users.filter(u => u.id !== parseInt(id));

    res.status(200).json({
        message: 'usuario eliminado correctamente',
        data: deletedUser
    });
};