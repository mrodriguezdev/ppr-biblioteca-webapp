export interface AuthResponse {
    token: string;
    data:  Data;
}

export interface Data {
    id:     number;
    email:  string;
    nombre: string;
    rol:    string;
}
