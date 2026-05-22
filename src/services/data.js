export const mockClients = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA',
        createdAt: new Date('2023-01-01'),
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '987-654-3210',
        address: '456 Elm St, Othertown, USA',
        createdAt: new Date('2023-02-15'),
    },
];
export const mockInvoices = [
    {
        id: '1',
        clientId: '1',
        amount: 150.0,
        status: 'Paid',
        dueDate: new Date('2023-03-01'),
    },
    {
        id: '2',
        clientId: '2',
        amount: 200.0,
        status: 'Pending',
        dueDate: new Date('2023-04-01'),
    },
];
export const mockLeads = [
    {
        id: '1',
        name: 'Lead One',
        status: 'New',
        createdAt: new Date('2023-05-01'),
    },
    {
        id: '2',
        name: 'Lead Two',
        status: 'Contacted',
        createdAt: new Date('2023-05-15'),
    },
];
