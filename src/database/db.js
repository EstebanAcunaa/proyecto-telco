export const database = {
  products: [
    // ========== ZAPATILLAS ==========
    { 
      id: 1, 
      name: 'Nike Air Max 90', 
      category: 'zapatillas', 
      price: 89999, 
      stock: 15,
      createdAt: new Date()
    },
    { 
      id: 2, 
      name: 'Adidas Superstar', 
      category: 'zapatillas', 
      price: 75999, 
      stock: 20,
      createdAt: new Date()
    },

    // ========== ROPA ==========
    { 
      id: 3, 
      name: 'Remera Taverniti Básica', 
      category: 'ropa', 
      brand: 'Taverniti',
      price: 24999, 
      stock: 30,
      createdAt: new Date()
    },
    { 
      id: 4, 
      name: 'Remera Estampada', 
      category: 'ropa', 
      brand: 'Taverniti',
      price: 35000, 
      stock: 30,
      createdAt: new Date()
    },
    { 
      id: 5, 
      name: 'Buzo Nike Sportswear', 
      category: 'ropa', 
      brand: 'Nike',
      price: 45999, 
      stock: 12,
      createdAt: new Date()
    },

    // ========== PERFUMES ==========
    { 
      id: 6, 
      name: 'Perfume 212 VIP Men', 
      category: 'perfumes', 
      brand: 'Carolina Herrera',
      price: 125000, 
      stock: 8,
      createdAt: new Date()
    },
    { 
      id: 7, 
      name: 'Armaf Club de Nuit Intense', 
      category: 'perfumes', 
      brand: 'Armaf',
      price: 50000, 
      stock: 2,
      createdAt: new Date()
    },
    { 
      id: 8, 
      name: 'Maison Alhambra Salvo EDP', 
      category: 'perfumes', 
      brand: 'Maison Alhambra',
      price: 50000, 
      stock: 2,
      createdAt: new Date()
    }
  ],

  users: [
    { 
      id: 1, 
      name: 'Juan Pérez', 
      email: 'juan@example.com',
      password: '$2b$10$PrLqypZGOKMKGf3GOAN5I.DCb0uFee/ea0J5scu5Rc8pMp9wqnZCO' ,
      role: 'admin',
      createdAt: new Date()
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria@example.com',
      password: '$2b$10$PrrjW7vM7yVp8uBfzRDpPuCbcU.AzYQ58PNjEzn1qxtJXRqnUxk9q',
      role: 'user',
      createdAt: new Date()
    },
    {
      id: 3,
      name: 'Carlos López',
      email: 'carlos@example.com',
      password: '$2b$10$2M.YvnB6M9VNs0MuRhBP2OJ.gIJw7WGxtdnUl7IjptgpPB4QKQaX2',
      role: 'user',
      createdAt: new Date()
    }
  ]
};

// Función helper para generar IDs únicos
export const getNextId = (collection) => {
  if (database[collection].length === 0) return 1;
  return Math.max(...database[collection].map(item => item.id)) + 1;
};

export default database;