export interface User {
    id: number,
    username: string, 
    email: string,
    role: 'astronaut' | 'commander' | 'admin'
}