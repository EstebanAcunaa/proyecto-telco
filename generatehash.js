import bcrypt from "bcryptjs";

const passwords = [
    {label: 'admin1234', password: 'admin1234'},
    {label: 'user123', password: 'user123'},
    {label: 'user1234', password: 'user1234'}
];

const generateHashes = async () => {
    console.log('=====Generando hashes============');

    for (const item of passwords){
        const hash = await bcrypt.hash(item.password, 10);
        console.log(`Contraseña: ${item.label}`);
        console.log(`Hash: ${hash}`);
        console.log('----\n');
    }
};

generateHashes();